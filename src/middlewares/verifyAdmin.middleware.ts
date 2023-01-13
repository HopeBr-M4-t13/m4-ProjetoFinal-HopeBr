import { Request, Response, NextFunction } from "express";
import AppError from "../errors/AppError";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";

const verifyAdminMiddleware = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const userRepository = AppDataSource.getRepository(User);
	const users = await userRepository.findOne({
		where: { id: request.user.id },
	});

	if (!users.isAdmin) {
		throw new AppError("User is not admin", 401);
	}

	return next();
};

export default verifyAdminMiddleware;
