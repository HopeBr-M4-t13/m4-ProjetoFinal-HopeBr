import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { Donation } from "../entities/donation.entity";
import { User } from "../entities/user.entity";

import AppError from "../errors/AppError";

const verifyOwnerOrAdminDonationMiddleware = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const userRepository = AppDataSource.getRepository(User);
	const users = await userRepository.findOne({
		where: { id: request.user.id },
	});

	const donationRepository = AppDataSource.getRepository(Donation)
	const donation = await donationRepository.findOne({
		where: { id: request.params.id },
		relations: {
			user: true
		}
	})

	if (!users.isAdmin) {
		if (users.id === donation.user.id) {
			return next();
		}
		throw new AppError("User not have permission", 401);
	}
	return next();
};

export default verifyOwnerOrAdminDonationMiddleware;
