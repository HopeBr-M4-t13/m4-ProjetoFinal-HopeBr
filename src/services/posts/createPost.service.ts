import AppDataSource from "../../data-source";
import { Category } from "../../entities/category.entity";
import { Post } from "../../entities/post.entity";
import { iPostResponse } from "../../interfaces/posts/posts.interface";
import { createPostSerializerResponse } from "../../serializers/post.serializer";

const createPostService = async (data: any, id: string): Promise<iPostResponse> => {
  const usersRepo = AppDataSource.getRepository(Post)
  const categoryRepo = AppDataSource.getRepository(Category)

  data.user = id

  const categoryFound = await categoryRepo.findOneBy({
    id: data.category
  })
  
  data.category =  categoryFound   
  
  const createPost = usersRepo.create(data)
  await usersRepo.save(createPost)

  const postToReturn = createPostSerializerResponse.validate(createPost, {
    stripUnknown: false
  })

  return postToReturn
}

export default createPostService;