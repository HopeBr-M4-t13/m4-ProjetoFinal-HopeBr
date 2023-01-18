import AppDataSource from "../../data-source";
import { Category } from "../../entities/category.entity";

const mockedCategory = {
	name: "Teste"
};

const mockedInvalidCategory = {
	name: ""
};

const mockedUpdateCategory = {
	name: "Update"
};

const mockedCategories = {
	Alimentos: "69002900-13ef-4ffb-a2ee-e00e2d549d2c",
	Beleza: "4397c912-ef08-4486-8195-33687c3d1a5b",
	Eletrônicos: "54fb59ac-61ff-4dd2-91c2-8859cf3900c8",
	Outros: "13076cec-9d82-4dcf-89db-7a38ab1f2059",
};

const mockedInsertCategories = async () => {
	await AppDataSource.getRepository(Category)
		.createQueryBuilder("categories")
		.insert()
		.values([
			{ id: "69002900-13ef-4ffb-a2ee-e00e2d549d2c", name: "Alimentos" },
			{ id: "4397c912-ef08-4486-8195-33687c3d1a5b", name: "Beleza" },
			{ id: "54fb59ac-61ff-4dd2-91c2-8859cf3900c8", name: "Eletrônicos" },
			{ id: "13076cec-9d82-4dcf-89db-7a38ab1f2059", name: "Outros" },
		])
		.execute();
};

export { mockedCategory, mockedInvalidCategory, mockedUpdateCategory, mockedCategories, mockedInsertCategories };