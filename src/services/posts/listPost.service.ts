import AppDataSource from "../../data-source";
import { Post } from "../../entities/post.entity";
import { iPostRequest } from "../../interfaces/posts/posts.interface";

const listPostService = async () => {

  const postRepo = AppDataSource.getRepository(Post)

  const listPost = await postRepo.find()

  return listPost
}

export default listPostService;