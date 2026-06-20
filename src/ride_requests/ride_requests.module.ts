import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { User } from '../users/entities/user.entity';
import { VehicleType } from '../vehicle_types/entities/vehicle_type.entity';
import { Vehicle } from '../vehicles/entities/vehicle.entity';
import { Ride } from '../rides/entities/ride.entity';
import { RideRequest } from './entities/ride_request.entity';
import { RideRequestsService } from './ride_requests.service';
import { RideRequestsController } from './ride_requests.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([RideRequest, User, VehicleType, Vehicle, Ride]),
    AuthModule,
  ],
  controllers: [RideRequestsController],
  providers: [RideRequestsService],
})
export class RideRequestsModule {}
