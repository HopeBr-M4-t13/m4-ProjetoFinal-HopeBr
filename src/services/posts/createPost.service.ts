import AppDataSource from "../../data-source";
import { Category } from "../../entities/category.entity";
import { Post } from "../../entities/post.entity";
import { User } from "../../entities/user.entity";
import { IPostResponse } from "../../interfaces/posts/posts.interface";
import { createPostSerializerResponse } from "../../serializers/post.serializer";

const createPostService = async (
	data: any,
	id: string
): Promise<IPostResponse> => {
	const postsRepo = AppDataSource.getRepository(Post);
	const categoryRepo = AppDataSource.getRepository(Category);
	const userRepo = AppDataSource.getRepository(User);

	const userFound = await userRepo.findOneBy({
		id: id,
	});

	data.user = userFound;

	const categoryFound = await categoryRepo.findOneBy({
		id: data.category,
	});

	data.category = categoryFound;

	const createPost = postsRepo.create(data);
	await postsRepo.save(createPost);

	const postToReturn = createPostSerializerResponse.validate(createPost, {
		stripUnknown: true,
	});

	return postToReturn;
};

export default createPostService;
