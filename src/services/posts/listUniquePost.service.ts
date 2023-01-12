import AppDataSource from "../../data-source";
import { Post } from "../../entities/post.entity";

const uniquePostService = async (id) => {
  const postRepo = AppDataSource.getRepository(Post)

  const post = await postRepo.findOneBy({
    id: id
  })  

  return post
}

export default uniquePostService;