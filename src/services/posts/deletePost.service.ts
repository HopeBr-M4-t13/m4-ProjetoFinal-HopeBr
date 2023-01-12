import AppDataSource from "../../data-source";
import { Post } from "../../entities/post.entity";

const deletePostService = async (id) => {

  const postRepo = AppDataSource.getRepository(Post)

  const postFound = await postRepo.findOneBy({
    id: id
  })

  await postRepo.remove(postFound)

  return {message: "post removed sucessfully"}
}

export default deletePostService