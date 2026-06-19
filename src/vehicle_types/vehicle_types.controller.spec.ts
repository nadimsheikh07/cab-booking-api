import { Test, TestingModule } from '@nestjs/testing';
import { VehicleTypesController } from './vehicle_types.controller';
import { VehicleTypesService } from './vehicle_types.service';

describe('VehicleTypesController', () => {
  let controller: VehicleTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehicleTypesController],
      providers: [VehicleTypesService],
    }).compile();

    controller = module.get<VehicleTypesController>(VehicleTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
