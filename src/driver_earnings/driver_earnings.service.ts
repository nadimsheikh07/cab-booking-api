import { Injectable } from '@nestjs/common';
import { CreateDriverEarningDto } from './dto/create-driver_earning.dto';
import { UpdateDriverEarningDto } from './dto/update-driver_earning.dto';

@Injectable()
export class DriverEarningsService {
  create(createDriverEarningDto: CreateDriverEarningDto) {
    return 'This action adds a new driverEarning';
  }

  findAll() {
    return `This action returns all driverEarnings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} driverEarning`;
  }

  update(id: number, updateDriverEarningDto: UpdateDriverEarningDto) {
    return `This action updates a #${id} driverEarning`;
  }

  remove(id: number) {
    return `This action removes a #${id} driverEarning`;
  }
}
