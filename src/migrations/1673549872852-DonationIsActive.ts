import { MigrationInterface, QueryRunner } from "typeorm";

export class DonationIsActive1673549872852 implements MigrationInterface {
    name = 'DonationIsActive1673549872852'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "donations" ADD "isActive" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "donations" DROP COLUMN "isActive"`);
    }

}
