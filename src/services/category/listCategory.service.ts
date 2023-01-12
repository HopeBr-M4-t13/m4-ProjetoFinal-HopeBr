import AppDataSource from "../../data-source";
import { Category } from "../../entities/category.entity";
import { ICategoryResponse } from "../../interfaces/category/category.interface";
import { listAllCategorySerilizer } from "../../serializers/category.serializer";

const listCategoryService = async (): Promise<ICategoryResponse[]> => {
  const cartegoryRepo = AppDataSource.getRepository(Category)

  const listCategory = await cartegoryRepo.find()

  const categoryList = listAllCategorySerilizer.validate(listCategory, {
    stripUnknown: true
  })

  return categoryList
}

export default listCategoryService;