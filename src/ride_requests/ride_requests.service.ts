import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Redis from 'ioredis';
import { Repository } from 'typeorm';
import { REDIS_CLIENT } from '../redis/redis.constants';
import { Ride, RideStatus } from '../rides/entities/ride.entity';
import { User, UserType } from '../users/entities/user.entity';
import { VehicleType } from '../vehicle_types/entities/vehicle_type.entity';
import { Vehicle } from '../vehicles/entities/vehicle.entity';
import { AcceptRideRequestDto } from './dto/accept-ride_request.dto';
import { CreateRideRequestDto } from './dto/create-ride_request.dto';
import { UpdateRideRequestDto } from './dto/update-ride_request.dto';
import {
  RideRequest,
  RideRequestStatus,
} from './entities/ride_request.entity';

@Injectable()
export class RideRequestsService {
  constructor(
    @InjectRepository(RideRequest)
    private readonly rideRequestsRepository: Repository<RideRequest>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(VehicleType)
    private readonly vehicleTypesRepository: Repository<VehicleType>,
    @InjectRepository(Vehicle)
    private readonly vehiclesRepository: Repository<Vehicle>,
    @InjectRepository(Ride)
    private readonly ridesRepository: Repository<Ride>,
    @Inject(REDIS_CLIENT)
    private readonly redis: Redis,
  ) {}

  async create(customerId: number, createRideRequestDto: CreateRideRequestDto) {
    const customer = await this.usersRepository.findOneBy({
      id: customerId,
      userType: UserType.CUSTOMER,
      isActive: true,
    });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    const vehicleType = await this.vehicleTypesRepository.findOneBy({
      id: createRideRequestDto.vehicleTypeId,
      isActive: true,
    });

    if (!vehicleType) {
      throw new NotFoundException('Vehicle type not found');
    }

    const rideRequest = this.rideRequestsRepository.create({
      customer,
      vehicleType,
      pickupAddress: createRideRequestDto.pickupAddress,
      pickupLatitude: createRideRequestDto.pickupLatitude,
      pickupLongitude: createRideRequestDto.pickupLongitude,
      dropAddress: createRideRequestDto.dropAddress,
      dropLatitude: createRideRequestDto.dropLatitude,
      dropLongitude: createRideRequestDto.dropLongitude,
      estimatedFare: createRideRequestDto.estimatedFare,
      distanceKm: createRideRequestDto.distanceKm,
      durationMinutes: createRideRequestDto.durationMinutes,
      status: RideRequestStatus.PENDING,
    });

    return this.rideRequestsRepository.save(rideRequest);
  }

  findAll() {
    return this.rideRequestsRepository.find({
      relations: { customer: true, driver: true, vehicleType: true },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const rideRequest = await this.rideRequestsRepository.findOne({
      where: { id },
      relations: { customer: true, driver: true, vehicleType: true },
    });

    if (!rideRequest) {
      throw new NotFoundException('Ride request not found');
    }

    return rideRequest;
  }

  async update(id: string, updateRideRequestDto: UpdateRideRequestDto) {
    const rideRequest = await this.findOne(id);
    Object.assign(rideRequest, updateRideRequestDto);
    return this.rideRequestsRepository.save(rideRequest);
  }

  async remove(id: string) {
    const rideRequest = await this.findOne(id);
    await this.rideRequestsRepository.remove(rideRequest);
    return { deleted: true };
  }

  async accept(
    rideRequestId: string,
    driverId: number,
    _dto: AcceptRideRequestDto,
  ) {
    const lockKey = `ride-request:${rideRequestId}:accept-lock`;
    const lockValue = String(driverId);
    const lock = await this.redis.set(lockKey, lockValue, 'EX', 30, 'NX');

    if (lock !== 'OK') {
      throw new ConflictException('Ride request is already being accepted');
    }

    try {
      return await this.rideRequestsRepository.manager.transaction(
        async (manager) => {
          const rideRequest = await manager.findOne(RideRequest, {
            where: { id: rideRequestId },
            relations: { customer: true, vehicleType: true },
            lock: { mode: 'pessimistic_write' },
          });

          if (!rideRequest) {
            throw new NotFoundException('Ride request not found');
          }

          if (rideRequest.status !== RideRequestStatus.PENDING) {
            throw new ConflictException('Ride request is already accepted');
          }

          const driver = await manager.findOne(User, {
            where: {
              id: driverId,
              userType: UserType.DRIVER,
              isActive: true,
            },
          });

          if (!driver) {
            throw new NotFoundException('Driver not found');
          }

          const vehicle = await manager.findOne(Vehicle, {
            where: {
              driver: { id: driverId },
              vehicleType: { id: rideRequest.vehicleType.id },
              isActive: true,
              isAvailable: true,
            },
            relations: { driver: true, vehicleType: true },
          });

          if (!vehicle) {
            throw new BadRequestException(
              'Driver does not have an available vehicle for this request',
            );
          }

          rideRequest.driver = driver;
          rideRequest.status = RideRequestStatus.ACCEPTED;
          await manager.save(rideRequest);

          vehicle.isAvailable = false;
          await manager.save(vehicle);

          const ride = manager.create(Ride, {
            rideRequest,
            customer: rideRequest.customer,
            driver,
            vehicle,
            pickupAddress: rideRequest.pickupAddress,
            dropAddress: rideRequest.dropAddress,
            pickupLatitude: rideRequest.pickupLatitude,
            pickupLongitude: rideRequest.pickupLongitude,
            dropLatitude: rideRequest.dropLatitude,
            dropLongitude: rideRequest.dropLongitude,
            estimatedFare: rideRequest.estimatedFare,
            distanceKm: rideRequest.distanceKm,
            durationMinutes: rideRequest.durationMinutes,
            status: RideStatus.ASSIGNED,
          });

          return manager.save(ride);
        },
      );
    } catch (error) {
      const value = await this.redis.get(lockKey);

      if (value === lockValue) {
        await this.redis.del(lockKey);
      }

      throw error;
    }
  }
}
