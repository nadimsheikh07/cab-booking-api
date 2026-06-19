import { PartialType } from '@nestjs/mapped-types';
import { CreateRideReviewDto } from './create-ride_review.dto';

export class UpdateRideReviewDto extends PartialType(CreateRideReviewDto) {}
