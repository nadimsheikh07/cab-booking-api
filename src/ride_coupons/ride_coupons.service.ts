import { Injectable } from '@nestjs/common';
import { CreateRideCouponDto } from './dto/create-ride_coupon.dto';
import { UpdateRideCouponDto } from './dto/update-ride_coupon.dto';

@Injectable()
export class RideCouponsService {
  create(createRideCouponDto: CreateRideCouponDto) {
    return 'This action adds a new rideCoupon';
  }

  findAll() {
    return `This action returns all rideCoupons`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rideCoupon`;
  }

  update(id: number, updateRideCouponDto: UpdateRideCouponDto) {
    return `This action updates a #${id} rideCoupon`;
  }

  remove(id: number) {
    return `This action removes a #${id} rideCoupon`;
  }
}
