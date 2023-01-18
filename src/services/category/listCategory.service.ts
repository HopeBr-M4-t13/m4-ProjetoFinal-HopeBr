import AppDataSource from "../../data-source";
import { Category } from "../../entities/category.entity";

const listCategoryService = async (): Promise<Category[]> => {
  const categoryRep = AppDataSource.getRepository(Category)

  const categories = await categoryRep.find()

  return categories  
}

export default listCategoryService;