import { Test, TestingModule } from '@nestjs/testing';
import { RideCouponsService } from './ride_coupons.service';

describe('RideCouponsService', () => {
  let service: RideCouponsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RideCouponsService],
    }).compile();

    service = module.get<RideCouponsService>(RideCouponsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
