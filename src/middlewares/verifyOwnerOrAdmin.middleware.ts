import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";

import AppError from "../errors/AppError";

const verifyOwnerOrAdminMiddleware = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const userRepository = AppDataSource.getRepository(User);
	const users = await userRepository.findOne({
		where: { id: request.user.id },
	});

	if (!users.isAdmin) {
		if (users.id === request.params.id) {
			return next();
		}
		throw new AppError("User not have permission", 401);
	}
	return next();
};

export default verifyOwnerOrAdminMiddleware;
