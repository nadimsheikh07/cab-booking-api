import { PartialType } from '@nestjs/mapped-types';
import { CreateDriverEarningDto } from './create-driver_earning.dto';

export class UpdateDriverEarningDto extends PartialType(CreateDriverEarningDto) {}
