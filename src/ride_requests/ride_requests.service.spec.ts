import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { REDIS_CLIENT } from '../redis/redis.constants';
import { Ride } from '../rides/entities/ride.entity';
import { User } from '../users/entities/user.entity';
import { VehicleType } from '../vehicle_types/entities/vehicle_type.entity';
import { Vehicle } from '../vehicles/entities/vehicle.entity';
import { RideRequest } from './entities/ride_request.entity';
import { RideRequestsService } from './ride_requests.service';

describe('RideRequestsService', () => {
  let service: RideRequestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RideRequestsService,
        {
          provide: getRepositoryToken(RideRequest),
          useValue: {},
        },
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
        {
          provide: getRepositoryToken(VehicleType),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Vehicle),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Ride),
          useValue: {},
        },
        {
          provide: REDIS_CLIENT,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<RideRequestsService>(RideRequestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
