import AppDataSource from "../../data-source";
import { Category } from "../../entities/category.entity";
import { Post } from "../../entities/post.entity";

const createPostService = async (data, id) => {
  const usersRepo = AppDataSource.getRepository(Post)
  const categoryRepo = AppDataSource.getRepository(Category)

  data.user = id
  const category = {
    name: data.category
  }

  const createCategory = categoryRepo.create(category)
  await categoryRepo.save(createCategory)

  data.category = createCategory

  const createPost = usersRepo.create(data)
  await usersRepo.save(createPost)

  return createPost
}

export default createPostService;