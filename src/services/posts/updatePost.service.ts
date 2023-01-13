import AppDataSource from "../../data-source";
import { Category } from "../../entities/category.entity";
import { Post } from "../../entities/post.entity";
import { iPostResponse, iPostUpdateRequest } from "../../interfaces/posts/posts.interface";

const updatePostService = async (id: string, postData): Promise<iPostResponse> => {

  const postRepo = AppDataSource.getRepository(Post)
  const categoryRepo = AppDataSource.getRepository(Category)

  const postFound = await postRepo.findOneBy({
      id: id    
  })

  const categoryFound = await categoryRepo.findOneBy({
    name: postData.category
  })

  if (categoryFound) {
    postData.category = categoryFound
  } else {
    const createCategory = categoryRepo.create({ name: postData.category })
    await categoryRepo.save(createCategory)

    postData.category = createCategory
  } 

  const updatedPost = postRepo.create({
    ...postFound,
    ...postData
  })  

  await postRepo.save(updatedPost)  

  return postData
}

export default updatePostService