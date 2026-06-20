import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from '../auth/current-user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import type { AuthUser } from '../auth/types/auth-user.type';
import { UserType } from '../users/entities/user.entity';
import { RideRequestsService } from './ride_requests.service';
import { AcceptRideRequestDto } from './dto/accept-ride_request.dto';
import { CreateRideRequestDto } from './dto/create-ride_request.dto';
import { UpdateRideRequestDto } from './dto/update-ride_request.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('ride-requests')
export class RideRequestsController {
  constructor(private readonly rideRequestsService: RideRequestsService) {}

  @Roles(UserType.CUSTOMER)
  @Post()
  create(
    @CurrentUser() user: AuthUser,
    @Body() createRideRequestDto: CreateRideRequestDto,
  ) {
    return this.rideRequestsService.create(user.sub, createRideRequestDto);
  }

  @Roles(UserType.DRIVER)
  @Post(':id/accept')
  accept(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
    @Body() dto: AcceptRideRequestDto,
  ) {
    return this.rideRequestsService.accept(id, user.sub, dto);
  }

  @Get()
  findAll() {
    return this.rideRequestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rideRequestsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRideRequestDto: UpdateRideRequestDto) {
    return this.rideRequestsService.update(id, updateRideRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rideRequestsService.remove(id);
  }
}
