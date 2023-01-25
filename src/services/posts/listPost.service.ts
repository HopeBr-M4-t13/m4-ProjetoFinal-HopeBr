import AppDataSource from "../../data-source";
import { Post } from "../../entities/post.entity";
import { iPostCategoryListResponse, iPostListResponse, iPostResponse } from "../../interfaces/posts/posts.interface";
import { postCategoryListSerializerResponse } from "../../serializers/post.serializer";

const listPostService = async () => {

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
      category: true,
      user:true
    }
  })  

  const listPostsToReturn = postCategoryListSerializerResponse.validate(listPosts, {
    stripUnknown: false,
  });
  
  return listPosts
}

export default listPostService;