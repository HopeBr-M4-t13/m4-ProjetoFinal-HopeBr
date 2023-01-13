import { User } from "../../entities/user.entity";
import AppDataSource from "../../data-source";
import { createPostSerializerResponse, editPostSerializer } from "../../serializers/post.serializer";
import { Category } from "../../entities/category.entity";
import { Post } from "../../entities/post.entity";
import { iEditPostRequest, iPostResponse } from "../../interfaces/posts/posts.interface";

const editPostService = async (id: string, postData: any): Promise<iPostResponse> => {

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

  const editedPost = postRepo.create({
    ...postFound,
    ...postData
  })

  await postRepo.save(editedPost)

  const postToReturn = await createPostSerializerResponse.validate(editedPost, {
    stripUnknown: true
  })

  return postToReturn
}

export default editPostService