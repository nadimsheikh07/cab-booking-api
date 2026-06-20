import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { UserType } from '../../users/entities/user.entity';

export class SignupDto {
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

  @IsIn([UserType.CUSTOMER, UserType.DRIVER])
  userType: UserType.CUSTOMER | UserType.DRIVER;

  @ValidateIf((dto: SignupDto) => dto.userType === UserType.DRIVER)
  @IsString()
  @IsNotEmpty()
  cabName?: string;

  @ValidateIf((dto: SignupDto) => dto.userType === UserType.DRIVER)
  @IsString()
  @IsNotEmpty()
  cabModel?: string;

  @ValidateIf((dto: SignupDto) => dto.userType === UserType.DRIVER)
  @IsString()
  @IsNotEmpty()
  cabNumber?: string;

  @IsOptional()
  @IsString()
  cabImage?: string;

  @ValidateIf((dto: SignupDto) => dto.userType === UserType.DRIVER)
  @IsString()
  @IsNotEmpty()
  drivingLicense?: string;
}
