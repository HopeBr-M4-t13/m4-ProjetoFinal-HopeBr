import AppDataSource from "../../data-source";
import { Post } from "../../entities/post.entity";
import AppError from "../../errors/AppError";
import { createPostSerializerResponse } from "../../serializers/post.serializer";

const uniquePostService = async (id: string) => {
	const postRepo = AppDataSource.getRepository(Post);

	const post = await postRepo.findOne({
		where: {
			id: id,
		},
		relations: {
			category: true,
			user: {
				image: true,
				address: true,
			},
		},
	});

	if (!post) {
		throw new AppError("Post not found", 404);
	}

	const returnedPost = await createPostSerializerResponse.validate(post, {
		stripUnknown: true,
	});

	return returnedPost;
};

export default uniquePostService;
