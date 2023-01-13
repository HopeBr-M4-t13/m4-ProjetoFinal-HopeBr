import AppDataSource from "../../data-source";
import { Post } from "../../entities/post.entity";
import { iPostResponse } from "../../interfaces/posts/posts.interface";
import { listAllPostsSerilizer } from "../../serializers/post.serializer";

const listPostService = async (): Promise<iPostResponse[]> => {

  const postRepo = AppDataSource.getRepository(Post)

  const listPosts = await postRepo.createQueryBuilder('posts').  
    innerJoinAndSelect('posts.category', 'category').
    innerJoinAndSelect('posts.user', 'address').
    getRawMany()
  
  
  return listPosts
}

export default listPostService;