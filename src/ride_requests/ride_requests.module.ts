import { Module } from '@nestjs/common';
import { RideRequestsService } from './ride_requests.service';
import { RideRequestsController } from './ride_requests.controller';

@Module({
  controllers: [RideRequestsController],
  providers: [RideRequestsService],
})
export class RideRequestsModule {}
