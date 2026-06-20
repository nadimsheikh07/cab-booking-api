import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PermissionsModule } from './permissions/permissions.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { VehicleTypesModule } from './vehicle_types/vehicle_types.module';
import { RideRequestsModule } from './ride_requests/ride_requests.module';
import { RidesModule } from './rides/rides.module';
import { PaymentsModule } from './payments/payments.module';
import { NotificationsModule } from './notifications/notifications.module';
import { CouponsModule } from './coupons/coupons.module';
import { RideReviewsModule } from './ride_reviews/ride_reviews.module';
import { DriverEarningsModule } from './driver_earnings/driver_earnings.module';
import { RideCouponsModule } from './ride_coupons/ride_coupons.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),

    PermissionsModule,

    RolesModule,

    UsersModule,

    VehiclesModule,

    VehicleTypesModule,

    RideRequestsModule,

    RidesModule,

    PaymentsModule,

    NotificationsModule,

    CouponsModule,

    RideReviewsModule,

    DriverEarningsModule,

    RideCouponsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
