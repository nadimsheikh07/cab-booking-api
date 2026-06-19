import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RideReviewsService } from './ride_reviews.service';
import { CreateRideReviewDto } from './dto/create-ride_review.dto';
import { UpdateRideReviewDto } from './dto/update-ride_review.dto';

@Controller('ride-reviews')
export class RideReviewsController {
  constructor(private readonly rideReviewsService: RideReviewsService) {}

  @Post()
  create(@Body() createRideReviewDto: CreateRideReviewDto) {
    return this.rideReviewsService.create(createRideReviewDto);
  }

  @Get()
  findAll() {
    return this.rideReviewsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rideReviewsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRideReviewDto: UpdateRideReviewDto) {
    return this.rideReviewsService.update(+id, updateRideReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rideReviewsService.remove(+id);
  }
}
