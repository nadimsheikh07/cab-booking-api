import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';
import { RideRequest } from '../../ride_requests/entities/ride_request.entity';

export enum RideStatus {
  ASSIGNED = 'assigned',
  ARRIVED = 'arrived',
  STARTED = 'started',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@Entity('rides')
export class Ride {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => RideRequest)
  @JoinColumn({ name: 'ride_request_id' })
  rideRequest: RideRequest;

  @ManyToOne(() => User)
  customer: User;

  @ManyToOne(() => User)
  driver: User;

  @ManyToOne(() => Vehicle)
  vehicle: Vehicle;

  @Column()
  pickupAddress: string;

  @Column()
  dropAddress: string;

  @Column('decimal', { precision: 10, scale: 7 })
  pickupLatitude: number;

  @Column('decimal', { precision: 10, scale: 7 })
  pickupLongitude: number;

  @Column('decimal', { precision: 10, scale: 7 })
  dropLatitude: number;

  @Column('decimal', { precision: 10, scale: 7 })
  dropLongitude: number;

  @Column({
    type: 'enum',
    enum: RideStatus,
    default: RideStatus.ASSIGNED,
  })
  status: RideStatus;

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

  @Column('decimal', {
    precision: 8,
    scale: 2,
    nullable: true,
  })
  distanceKm: number;

  @Column({ nullable: true })
  durationMinutes: number;

  @Column({ nullable: true })
  startedAt: Date;

  @Column({ nullable: true })
  completedAt: Date;

  @Column({ nullable: true })
  cancelledAt: Date;

  @Column({ nullable: true })
  cancelReason: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
