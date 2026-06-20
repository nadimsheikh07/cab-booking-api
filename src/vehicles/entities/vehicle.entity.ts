import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { VehicleType } from 'src/vehicle_types/entities/vehicle_type.entity';

@Entity('vehicles')
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // Swift Dzire

  @Column()
  model: string; // 2024

  @Column({ unique: true })
  vehicleNumber: string;

  @Column({ nullable: true })
  color: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  registrationNumber: string;

  @Column({ nullable: true })
  insuranceNumber: string;

  @Column({ nullable: true })
  pollutionCertificate: string;

  @Column({ default: true })
  isAvailable: boolean;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => VehicleType, (vehicleType) => vehicleType.vehicles)
  @JoinColumn({ name: 'vehicle_type_id' })
  vehicleType: VehicleType;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'driver_id' })
  driver: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
