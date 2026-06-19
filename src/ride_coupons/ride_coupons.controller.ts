import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RideCouponsService } from './ride_coupons.service';
import { CreateRideCouponDto } from './dto/create-ride_coupon.dto';
import { UpdateRideCouponDto } from './dto/update-ride_coupon.dto';

@Controller('ride-coupons')
export class RideCouponsController {
  constructor(private readonly rideCouponsService: RideCouponsService) {}

  @Post()
  create(@Body() createRideCouponDto: CreateRideCouponDto) {
    return this.rideCouponsService.create(createRideCouponDto);
  }

  @Get()
  findAll() {
    return this.rideCouponsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rideCouponsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRideCouponDto: UpdateRideCouponDto) {
    return this.rideCouponsService.update(+id, updateRideCouponDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rideCouponsService.remove(+id);
  }
}
