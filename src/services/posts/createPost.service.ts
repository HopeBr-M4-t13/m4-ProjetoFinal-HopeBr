import AppDataSource from "../../data-source";
import { Post } from "../../entities/post.entity";

const createUserService = async (data) => {
  const usersRep = AppDataSource.getRepository(Post)

  const createPost = usersRep.create(data)
  await usersRep.save(createPost)

  // const dataResponse = await userResponseSerializer.validate(createUser, {
  //   stripUnknown: true
  // })

  return createPost
}

export default createUserService;