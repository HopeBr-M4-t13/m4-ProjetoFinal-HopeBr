import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { Post } from "../entities/post.entity";
import { User } from "../entities/user.entity";

import AppError from "../errors/AppError";

const verifyOwnerOrAdminPostMiddleware = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const userRepository = AppDataSource.getRepository(User);
	const users = await userRepository.findOne({
		where: { id: request.user.id },
	});

	const postsRepository = AppDataSource.getRepository(Post);
	const post = await postsRepository.findOne({
		where: { id: request.params.id },
		relations: {
			user: true,
		},
	});

	if (!post) {
		throw new AppError("Post not found", 404);
	}

	if (!users.isAdmin) {
		if (users.id === post.user.id) {
			return next();
		}
		throw new AppError("User not have permission", 401);
	}
	return next();
};

export default verifyOwnerOrAdminPostMiddleware;
