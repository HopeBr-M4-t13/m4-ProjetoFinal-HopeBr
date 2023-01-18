import { MigrationInterface, QueryRunner } from "typeorm";

export class imageOnDeleteSetNull1674081527299 implements MigrationInterface {
    name = 'imageOnDeleteSetNull1674081527299'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_0b9cf86bd47b4393165e9bddf3c"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_0b9cf86bd47b4393165e9bddf3c" FOREIGN KEY ("imageId") REFERENCES "images"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_0b9cf86bd47b4393165e9bddf3c"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_0b9cf86bd47b4393165e9bddf3c" FOREIGN KEY ("imageId") REFERENCES "images"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
