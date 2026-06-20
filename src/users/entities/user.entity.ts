import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum UserType {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  DRIVER = 'driver',
  CUSTOMER = 'customer',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true, length: 15 })
  mobile: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserType,
    default: UserType.CUSTOMER,
  })
  userType: UserType;

  @Column({ default: true })
  isActive: boolean;

  // Driver Fields
  @Column({ nullable: true })
  cabName: string;

  @Column({ nullable: true })
  cabModel: string;

  @Column({ nullable: true })
  cabNumber: string;

  @Column({ nullable: true })
  cabImage: string;

  @Column({ nullable: true })
  drivingLicense: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
