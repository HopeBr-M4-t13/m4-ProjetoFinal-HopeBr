import AppDataSource from "../../data-source";
import { Post } from "../../entities/post.entity";

const uniquePostService = async (id: string) => {
  const postRepo = AppDataSource.getRepository(Post)

  const post = await postRepo.findOne({
    where: {
      id: id
    },
    relations: {
      category: true,
      user: true
    },
  })

  return post
}

export default uniquePostService;