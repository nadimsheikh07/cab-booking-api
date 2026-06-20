import { Permission } from '../../permissions/entities/permission.entity';
import { DataSource } from 'typeorm';

export class PermissionSeeder {
  constructor(private readonly dataSource: DataSource) {}

  async run(): Promise<void> {
    const permissionRepository = this.dataSource.getRepository(Permission);

    const permissions = [
      // Users
      'users.create',
      'users.read',
      'users.update',
      'users.delete',

      // Roles
      'roles.create',
      'roles.read',
      'roles.update',
      'roles.delete',

      // Permissions
      'permissions.create',
      'permissions.read',
      'permissions.update',
      'permissions.delete',

      // Drivers
      'drivers.create',
      'drivers.read',
      'drivers.update',
      'drivers.delete',

      // Customers
      'customers.create',
      'customers.read',
      'customers.update',
      'customers.delete',

      // Cabs
      'cabs.create',
      'cabs.read',
      'cabs.update',
      'cabs.delete',

      // Bookings
      'bookings.create',
      'bookings.read',
      'bookings.update',
      'bookings.delete',

      // Payments
      'payments.create',
      'payments.read',
      'payments.update',
      'payments.delete',
    ];

    for (const name of permissions) {
      const exists = await permissionRepository.findOne({
        where: { name },
      });

      if (!exists) {
        await permissionRepository.save({
          name,
        });
      }
    }

    console.log('Permissions seeded successfully');
  }
}
