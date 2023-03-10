import { NextFunction, Request, Response } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import AppError from "../errors/AppError";

const verifyEmailExistsMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const userRepository = AppDataSource.getRepository(User);
	if(req.body.email){

	const emailExists = await userRepository.findOneBy({
		email: req.body.email,
	});

	if(emailExists && !emailExists.isActive) {
		req.reactivateUser = {
			id: emailExists.id
		}
		return next()
	}
	
		if (emailExists) {
			if (emailExists.id === req.params.id) {
				return next();
			}
			throw new AppError("This user already exists", 409);
		}
	}
	return next();
};

export default verifyEmailExistsMiddleware;
