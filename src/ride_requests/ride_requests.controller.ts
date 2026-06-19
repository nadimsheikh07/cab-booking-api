import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RideRequestsService } from './ride_requests.service';
import { CreateRideRequestDto } from './dto/create-ride_request.dto';
import { UpdateRideRequestDto } from './dto/update-ride_request.dto';

@Controller('ride-requests')
export class RideRequestsController {
  constructor(private readonly rideRequestsService: RideRequestsService) {}

  @Post()
  create(@Body() createRideRequestDto: CreateRideRequestDto) {
    return this.rideRequestsService.create(createRideRequestDto);
  }

  @Get()
  findAll() {
    return this.rideRequestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rideRequestsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRideRequestDto: UpdateRideRequestDto) {
    return this.rideRequestsService.update(+id, updateRideRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rideRequestsService.remove(+id);
  }
}
