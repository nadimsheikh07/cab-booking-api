import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { DataSource } from 'typeorm';
import { PermissionSeeder } from './seeders/permission.seeder';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const dataSource = app.get(DataSource);

  await new PermissionSeeder(dataSource).run();

  await app.close();
}

bootstrap();
