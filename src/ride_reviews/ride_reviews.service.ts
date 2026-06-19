import { Injectable } from '@nestjs/common';
import { CreateRideReviewDto } from './dto/create-ride_review.dto';
import { UpdateRideReviewDto } from './dto/update-ride_review.dto';

@Injectable()
export class RideReviewsService {
  create(createRideReviewDto: CreateRideReviewDto) {
    return 'This action adds a new rideReview';
  }

  findAll() {
    return `This action returns all rideReviews`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rideReview`;
  }

  update(id: number, updateRideReviewDto: UpdateRideReviewDto) {
    return `This action updates a #${id} rideReview`;
  }

  remove(id: number) {
    return `This action removes a #${id} rideReview`;
  }
}
