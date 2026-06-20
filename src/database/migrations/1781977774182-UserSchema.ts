import { MigrationInterface, QueryRunner } from "typeorm";

export class UserSchema1781977774182 implements MigrationInterface {
    name = 'UserSchema1781977774182'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_usertype_enum" AS ENUM('super_admin', 'admin', 'driver', 'customer')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "email" character varying NOT NULL, "mobile" character varying(15) NOT NULL, "password" character varying NOT NULL, "userType" "public"."users_usertype_enum" NOT NULL DEFAULT 'customer', "isActive" boolean NOT NULL DEFAULT true, "cabName" character varying, "cabModel" character varying, "cabNumber" character varying, "cabImage" character varying, "drivingLicense" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_d376a9f93bba651f32a2c03a7d3" UNIQUE ("mobile"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_usertype_enum"`);
    }

}
