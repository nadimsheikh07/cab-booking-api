import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';
import { UserType } from '../entities/user.entity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(10, 15)
  mobile: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsEnum(UserType)
  userType: UserType;

  @IsOptional()
  @IsString()
  cabName?: string;

  @IsOptional()
  @IsString()
  cabModel?: string;

  @IsOptional()
  @IsString()
  cabNumber?: string;

  @IsOptional()
  @IsString()
  cabImage?: string;

  @IsOptional()
  @IsString()
  drivingLicense?: string;
}
