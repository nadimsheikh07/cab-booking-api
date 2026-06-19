import { Module } from '@nestjs/common';
import { DriverEarningsService } from './driver_earnings.service';
import { DriverEarningsController } from './driver_earnings.controller';

@Module({
  controllers: [DriverEarningsController],
  providers: [DriverEarningsService],
})
export class DriverEarningsModule {}
