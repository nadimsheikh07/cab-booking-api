import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { VehicleType } from '../../vehicle_types/entities/vehicle_type.entity';

export enum RideRequestStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  DRIVER_ASSIGNED = 'driver_assigned',
  ARRIVED = 'arrived',
  STARTED = 'started',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@Entity('ride_requests')
export class RideRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  customer: User;

  @ManyToOne(() => User, { nullable: true })
  driver: User;

  @ManyToOne(() => VehicleType)
  vehicleType: VehicleType;

  @Column()
  pickupAddress: string;

  @Column('decimal', { precision: 10, scale: 7 })
  pickupLatitude: number;

  @Column('decimal', { precision: 10, scale: 7 })
  pickupLongitude: number;

  @Column()
  dropAddress: string;

  @Column('decimal', { precision: 10, scale: 7 })
  dropLatitude: number;

  @Column('decimal', { precision: 10, scale: 7 })
  dropLongitude: number;

  @Column({
    type: 'enum',
    enum: RideRequestStatus,
    default: RideRequestStatus.PENDING,
  })
  status: RideRequestStatus;

  @Column('decimal', {
    precision: 10,
    scale: 2,
    nullable: true,
  })
  estimatedFare: number;

  @Column('decimal', {
    precision: 10,
    scale: 2,
    nullable: true,
  })
  finalFare: number;

  @Column({ nullable: true })
  distanceKm: number;

  @Column({ nullable: true })
  durationMinutes: number;

  @Column({ nullable: true })
  cancelReason: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
