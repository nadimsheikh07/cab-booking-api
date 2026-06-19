import { Injectable } from '@nestjs/common';
import { CreateRideRequestDto } from './dto/create-ride_request.dto';
import { UpdateRideRequestDto } from './dto/update-ride_request.dto';

@Injectable()
export class RideRequestsService {
  create(createRideRequestDto: CreateRideRequestDto) {
    return 'This action adds a new rideRequest';
  }

  findAll() {
    return `This action returns all rideRequests`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rideRequest`;
  }

  update(id: number, updateRideRequestDto: UpdateRideRequestDto) {
    return `This action updates a #${id} rideRequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} rideRequest`;
  }
}
