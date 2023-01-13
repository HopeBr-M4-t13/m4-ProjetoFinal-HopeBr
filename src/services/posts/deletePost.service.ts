import AppDataSource from "../../data-source";
import { Post } from "../../entities/post.entity";

const deletePostService = async(id: string) => {

  const postRepo = AppDataSource.getRepository(Post)

  const postFound = await postRepo.findOneBy({
    id: id
  })

  await postRepo.remove(postFound)

  return {message: "post removed successfully"}
}

export default deletePostService