import { Test, TestingModule } from '@nestjs/testing';
import { RideRequestsController } from './ride_requests.controller';
import { RideRequestsService } from './ride_requests.service';

describe('RideRequestsController', () => {
  let controller: RideRequestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RideRequestsController],
      providers: [RideRequestsService],
    }).compile();

    controller = module.get<RideRequestsController>(RideRequestsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
