import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CurrentUser } from './current-user.decorator';
import type { AuthUser } from './types/auth-user.type';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({
    summary: 'User Registration',
    description: 'Register a new user account with email and password',
  })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered',
    schema: {
      example: {
        statusCode: 201,
        message: 'User registered successfully',
        data: {
          id: '550e8400-e29b-41d4-a716-446655440000',
          name: 'John Doe',
          email: 'john.doe@example.com',
          mobile: '+1234567890',
          userType: 'CUSTOMER',
          createdAt: '2026-06-25T10:30:00.000Z',
          updatedAt: '2026-06-25T10:30:00.000Z',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid input data',
    schema: {
      example: {
        statusCode: 400,
        message: [
          'name must be a string',
          'email must be an email',
          'mobile must be between 10 and 15 characters',
          'password must be at least 6 characters',
          'userType must be one of the following values: CUSTOMER, DRIVER',
          'cabName should not be empty',
          'cabModel should not be empty',
          'cabNumber should not be empty',
          'drivingLicense should not be empty',
        ],
        error: 'Bad Request',
      },
    },
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict - Email or mobile already exists',
    schema: {
      example: {
        statusCode: 409,
        message: 'Email already registered',
        error: 'Conflict',
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    schema: {
      example: {
        statusCode: 500,
        message: 'Internal server error',
        error: 'Internal Server Error',
      },
    },
  })
  signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  signin(@Body() dto: SigninDto) {
    return this.authService.signin(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@CurrentUser() user: AuthUser) {
    return this.authService.getProfile(user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  updateProfile(@CurrentUser() user: AuthUser, @Body() dto: UpdateProfileDto) {
    return this.authService.updateProfile(user, dto);
  }
}
