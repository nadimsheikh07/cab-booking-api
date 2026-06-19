import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DriverEarningsService } from './driver_earnings.service';
import { CreateDriverEarningDto } from './dto/create-driver_earning.dto';
import { UpdateDriverEarningDto } from './dto/update-driver_earning.dto';

@Controller('driver-earnings')
export class DriverEarningsController {
  constructor(private readonly driverEarningsService: DriverEarningsService) {}

  @Post()
  create(@Body() createDriverEarningDto: CreateDriverEarningDto) {
    return this.driverEarningsService.create(createDriverEarningDto);
  }

  @Get()
  findAll() {
    return this.driverEarningsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.driverEarningsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDriverEarningDto: UpdateDriverEarningDto) {
    return this.driverEarningsService.update(+id, updateDriverEarningDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.driverEarningsService.remove(+id);
  }
}
