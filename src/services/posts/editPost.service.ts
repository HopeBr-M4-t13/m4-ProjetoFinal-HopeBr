import { User } from "../../entities/user.entity";
import AppDataSource from "../../data-source";
import { editPostSerializer } from "../../serializers/post.serializer";
import { Category } from "../../entities/category.entity";
import { Post } from "../../entities/post.entity";

const editPostService = async (id, postData) => {

  const postRepo = AppDataSource.getRepository(Post)
  const categoryRepo = AppDataSource.getRepository(Category)

  const postFound = await postRepo.findOneBy({
    id: id
  })

  const categoryFound = await categoryRepo.findOneBy({
    name: postData.category
  })

  postData.category = categoryFound.id

  if (!categoryFound) {
    const category = {
      name: postData.category
    }
    const createCategory = categoryRepo.create(category)
    await categoryRepo.save(createCategory)
    
    postData.category = createCategory
  }

  const editedPost = postRepo.create({
    ...postFound,
    ...postData
  })

  await postRepo.save(editedPost)

  const postToReturn = await editPostSerializer.validate(editedPost, {
    stripUnknown: true
  })

  return postToReturn
}

export default editPostService