import AppDataSource from "../../data-source";
import { Post } from "../../entities/post.entity";
import { iPostResponse } from "../../interfaces/posts/posts.interface";
import { listAllPostsSerilizer } from "../../serializers/post.serializer";

const listPostService = async (): Promise<iPostResponse[]> => {

  const postRepo = AppDataSource.getRepository(Post)

  const listPost = await postRepo.find()

  const postToReturn = await listAllPostsSerilizer.validate(listPost, {
    stripUnknown: true
  })

  return postToReturn
}

export default listPostService;