import AppDataSource from "../../data-source";
import { Post } from "../../entities/post.entity";
import { iPostListResponse, iPostResponse } from "../../interfaces/posts/posts.interface";

const listPostService = async (): Promise<iPostResponse[]> => {

  const postRepo = AppDataSource.getRepository(Post)

  const listPosts = await postRepo.find({
    select: {
      id: true,
      title: true,
      content: true,
      donated: true,
      createdAt: true,
      updatedAt: true      
    },
    relations: {
      category: true 
    },
  })

  
  
  return listPosts
}

export default listPostService;