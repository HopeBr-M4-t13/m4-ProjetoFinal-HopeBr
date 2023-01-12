import AppDataSource from "../../data-source";
import { Category } from "../../entities/category.entity";
import { Post } from "../../entities/post.entity";

const listCategoryService = async () => {
  const usersRep = AppDataSource.getRepository(Category)

  const listPost = await usersRep.find()

  return listPost
}

export default listCategoryService;