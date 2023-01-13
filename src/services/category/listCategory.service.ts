import AppDataSource from "../../data-source";
import { Category } from "../../entities/category.entity";
import { ICategoryResponse } from "../../interfaces/category/category.interface";
import { listAllCategorySerializer } from "../../serializers/category.serializer";

const listCategoryService = async (): Promise<ICategoryResponse[]> => {
  const categoryRepo = AppDataSource.getRepository(Category)

  const listCategory = await categoryRepo.find({
    select: {
      id: true,
      name: true
    },
    relations: {
      posts: true,
      donations: true
    },
  })

  const categoryList = listAllCategorySerializer.validate(listCategory, {
    stripUnknown: true
  })

  return categoryList
}

export default listCategoryService;