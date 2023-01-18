import AppDataSource from "../../data-source";
import { Category } from "../../entities/category.entity";
import { ICategoryRequest } from "../../interfaces/category/category.interface";

const createCategoryService = async (categoryData: ICategoryRequest): Promise<Category> => {
    const categoriesRep = AppDataSource.getRepository(Category)

    const newCategory = categoriesRep.create(categoryData)
    await categoriesRep.save(newCategory)

    return newCategory
}

export default createCategoryService;