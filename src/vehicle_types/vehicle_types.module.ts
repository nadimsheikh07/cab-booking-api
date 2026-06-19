import { Module } from '@nestjs/common';
import { VehicleTypesService } from './vehicle_types.service';
import { VehicleTypesController } from './vehicle_types.controller';

@Module({
  controllers: [VehicleTypesController],
  providers: [VehicleTypesService],
})
export class VehicleTypesModule {}
