import { Test, TestingModule } from '@nestjs/testing';
import { DriverEarningsController } from './driver_earnings.controller';
import { DriverEarningsService } from './driver_earnings.service';

describe('DriverEarningsController', () => {
  let controller: DriverEarningsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DriverEarningsController],
      providers: [DriverEarningsService],
    }).compile();

    controller = module.get<DriverEarningsController>(DriverEarningsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
