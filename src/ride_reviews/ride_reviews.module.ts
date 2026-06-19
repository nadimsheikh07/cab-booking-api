import { Module } from '@nestjs/common';
import { RideReviewsService } from './ride_reviews.service';
import { RideReviewsController } from './ride_reviews.controller';

@Module({
  controllers: [RideReviewsController],
  providers: [RideReviewsService],
})
export class RideReviewsModule {}
