import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('vehicle_types')
export class VehicleType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string; // Sedan, SUV, Hatchback, Mini

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  baseFare: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  perKmRate: number;

  @Column({ default: 4 })
  seatCapacity: number;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.vehicleType)
  vehicles: Vehicle[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
