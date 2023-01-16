import AppDataSource from "../../data-source";
import { Category } from "../../entities/category.entity";
import { Post } from "../../entities/post.entity";
import AppError from "../../errors/AppError";
import {
	iPostResponse,
	iPostUpdateRequest,
} from "../../interfaces/posts/posts.interface";
import uniquePostService from "./listUniquePost.service";

const updatePostService = async (id: string, postData) => {
	const postRepo = AppDataSource.getRepository(Post);
	const categoryRepo = AppDataSource.getRepository(Category);

	const postFound = await postRepo.findOneBy({
		id: id,
	});

	if (!postFound) {
		throw new AppError("Post not found", 404);
	}

	if (postData.category) {
		const categoryFound = await categoryRepo.findOneBy({
			id: postData.category,
		});

		if (!categoryFound) {
			throw new AppError("Category not found", 404);
		}
		postData.category = categoryFound;
	}

	const updatedPost = postRepo.create({
		...postFound,
		...postData,
	});

	await postRepo.save(updatedPost);

	const postToReturn = await uniquePostService(id);

	return postToReturn;
};

export default updatePostService;
