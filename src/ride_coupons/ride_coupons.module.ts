import { Module } from '@nestjs/common';
import { RideCouponsService } from './ride_coupons.service';
import { RideCouponsController } from './ride_coupons.controller';

@Module({
  controllers: [RideCouponsController],
  providers: [RideCouponsService],
})
export class RideCouponsModule {}
