import { Test, TestingModule } from '@nestjs/testing';
import { RideCouponsController } from './ride_coupons.controller';
import { RideCouponsService } from './ride_coupons.service';

describe('RideCouponsController', () => {
  let controller: RideCouponsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RideCouponsController],
      providers: [RideCouponsService],
    }).compile();

    controller = module.get<RideCouponsController>(RideCouponsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
