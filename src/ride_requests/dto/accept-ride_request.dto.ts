import { IsOptional, IsString } from 'class-validator';

export class AcceptRideRequestDto {
  @IsOptional()
  @IsString()
  note?: string;
}
