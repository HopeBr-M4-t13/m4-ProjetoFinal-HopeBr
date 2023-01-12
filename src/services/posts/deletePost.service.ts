import AppDataSource from "../../data-source";
import { Post } from "../../entities/post.entity";

const deletePostService = async (id) => {

  const postRepo = AppDataSource.getRepository(Post)

  const postFound = await postRepo.findOneBy({
    id: id
  })

  await postRepo.softRemove(postFound)

  return {}
}

export default deletePostService