import { Test, TestingModule } from '@nestjs/testing';
import { DriverEarningsService } from './driver_earnings.service';

describe('DriverEarningsService', () => {
  let service: DriverEarningsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DriverEarningsService],
    }).compile();

    service = module.get<DriverEarningsService>(DriverEarningsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
