import { MigrationInterface, QueryRunner } from "typeorm";

export class editImageEntity1674062178655 implements MigrationInterface {
    name = 'editImageEntity1674062178655'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "images" DROP CONSTRAINT "UQ_e82379ecf3254d7def19b8e0168"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "images" ADD CONSTRAINT "UQ_e82379ecf3254d7def19b8e0168" UNIQUE ("imageUrl")`);
    }

}
