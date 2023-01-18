import { MigrationInterface, QueryRunner } from "typeorm";

export class addTableCategoriesValues1673893097386
	implements MigrationInterface
{
	name = "addTableCategoriesValues1673893097386";
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`INSERT INTO "categories" (id, name)
        VALUES 
            ('69002900-13ef-4ffb-a2ee-e00e2d549d2c', 'Alimentos'),
            ('c1e25c3d-5365-4718-bb9b-da9f34ef4d99', 'Autos e peças'),
            ('4397c912-ef08-4486-8195-33687c3d1a5b', 'Beleza'),
            ('a369b8a5-8812-4369-8071-ab55328be36a', 'Brinquedos'),
            ('f1320840-7d96-4fd9-b6e3-c5c1d19b3561', 'Dinheiro'),
            ('cfb2b941-800a-45ab-b8da-c70a0ea62f9e', 'Eletrodomésticos'),
            ('54fb59ac-61ff-4dd2-91c2-8859cf3900c8', 'Eletrônicos'),
            ('569038a8-94a6-443e-afd6-ee8953751773', 'Esportes'),
            ('e8547a78-8f8a-4602-8a86-863b27a69039', 'Ferramentas'),
            ('bd47b19d-3c67-4199-9554-a3a784d38448', 'Materiais de construção'),
            ('33914838-0a08-4bdb-8bfc-44297d7a760b', 'Móveis'),
            ('3141d888-4063-4d4b-9cab-e114c7bcd437', 'Roupas'),
            ('1bc94d61-365a-4b20-9611-e8ad3609afb1', 'Pets'),
            ('16800b37-a498-47d5-b9bf-51cbe2e47cfb', 'Serviços'),
            ('13076cec-9d82-4dcf-89db-7a38ab1f2059', 'Outros')`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`DELETE FROM categories WHERE id = '69002900-13ef-4ffb-a2ee-e00e2d549d2c' AND name = 'Alimentos'`
		);
		await queryRunner.query(
			`DELETE FROM categories WHERE id = 'c1e25c3d-5365-4718-bb9b-da9f34ef4d99' AND name = 'Autos e peças'`
		);
		await queryRunner.query(
			`DELETE FROM categories WHERE id = '4397c912-ef08-4486-8195-33687c3d1a5b' AND name = 'Beleza'`
		);
		await queryRunner.query(
			`DELETE FROM categories WHERE id = 'a369b8a5-8812-4369-8071-ab55328be36a' AND name = 'Brinquedos'`
		);
		await queryRunner.query(
			`DELETE FROM categories WHERE id = 'f1320840-7d96-4fd9-b6e3-c5c1d19b3561' AND name = 'Dinheiro'`
		);
		await queryRunner.query(
			`DELETE FROM categories WHERE id = 'cfb2b941-800a-45ab-b8da-c70a0ea62f9e' AND name = 'Eletrodomésticos'`
		);
		await queryRunner.query(
			`DELETE FROM categories WHERE id = '54fb59ac-61ff-4dd2-91c2-8859cf3900c8' AND name = 'Eletrônicos'`
		);
		await queryRunner.query(
			`DELETE FROM categories WHERE id = '569038a8-94a6-443e-afd6-ee8953751773' AND name = 'Esportes'`
		);
		await queryRunner.query(
			`DELETE FROM categories WHERE id = 'e8547a78-8f8a-4602-8a86-863b27a69039' AND name = 'Ferramentas'`
		);
		await queryRunner.query(
			`DELETE FROM categories WHERE id = 'bd47b19d-3c67-4199-9554-a3a784d38448' AND name = 'Materiais de construção'`
		);
		await queryRunner.query(
			`DELETE FROM categories WHERE id = '33914838-0a08-4bdb-8bfc-44297d7a760b' AND name = 'Móveis'`
		);
		await queryRunner.query(
			`DELETE FROM categories WHERE id = '3141d888-4063-4d4b-9cab-e114c7bcd437' AND name = 'Roupas'`
		);
		await queryRunner.query(
			`DELETE FROM categories WHERE id = '1bc94d61-365a-4b20-9611-e8ad3609afb1' AND name = 'Pets'`
		);
		await queryRunner.query(
			`DELETE FROM categories WHERE id = '16800b37-a498-47d5-b9bf-51cbe2e47cfb' AND name = 'Serviços'`
		);
		await queryRunner.query(
			`DELETE FROM categories WHERE id = '13076cec-9d82-4dcf-89db-7a38ab1f2059' AND name = 'Outros'`
		);
	}
}
