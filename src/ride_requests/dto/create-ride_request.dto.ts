import { Type } from 'class-transformer';
import {
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateRideRequestDto {
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  vehicleTypeId: number;

  @IsString()
  @IsNotEmpty()
  pickupAddress: string;

  @Type(() => Number)
  @IsLatitude()
  pickupLatitude: number;

  @Type(() => Number)
  @IsLongitude()
  pickupLongitude: number;

  @IsString()
  @IsNotEmpty()
  dropAddress: string;

  @Type(() => Number)
  @IsLatitude()
  dropLatitude: number;

  @Type(() => Number)
  @IsLongitude()
  dropLongitude: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  estimatedFare?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  distanceKm?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  durationMinutes?: number;
}
