import { PartialType } from '@nestjs/mapped-types';
import { CreateRideCouponDto } from './create-ride_coupon.dto';

export class UpdateRideCouponDto extends PartialType(CreateRideCouponDto) {}
