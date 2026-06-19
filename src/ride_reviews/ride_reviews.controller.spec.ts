import { Test, TestingModule } from '@nestjs/testing';
import { RideReviewsController } from './ride_reviews.controller';
import { RideReviewsService } from './ride_reviews.service';

describe('RideReviewsController', () => {
  let controller: RideReviewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RideReviewsController],
      providers: [RideReviewsService],
    }).compile();

    controller = module.get<RideReviewsController>(RideReviewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
