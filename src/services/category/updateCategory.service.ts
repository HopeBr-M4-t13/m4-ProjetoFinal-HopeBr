import dataSource from "../../data-source";
import { Category } from "../../entities/category.entity";
import { ICategoryRequest } from "../../interfaces/category/category.interface";

const updateCategoryService = async (id: string, data: ICategoryRequest): Promise<Category> => {
    const categoriesRep = dataSource.getRepository(Category)

    const findCategory = await categoriesRep.findOneBy({
        id: id
    })

    const updateCategory = categoriesRep.create({
        ...findCategory,
        ...data
    })
    await categoriesRep.save(updateCategory)

    return updateCategory
}

export default updateCategoryService;