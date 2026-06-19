import { Test, TestingModule } from '@nestjs/testing';
import { RideReviewsService } from './ride_reviews.service';

describe('RideReviewsService', () => {
  let service: RideReviewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RideReviewsService],
    }).compile();

    service = module.get<RideReviewsService>(RideReviewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
