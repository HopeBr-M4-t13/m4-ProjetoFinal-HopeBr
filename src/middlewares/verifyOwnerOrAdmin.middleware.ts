import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { Donation } from "../entities/donation.entity";
import { User } from "../entities/user.entity";
import AppError from "../errors/AppError";

const ensureOwnerOrAdminMiddleware = async (request: Request, response: Response, next: NextFunction) => {
  const userRepository = AppDataSource.getRepository(User);
  const donationRepository = AppDataSource.getRepository(Donation);
  const users = await userRepository.findOne({ where: { id: request.user.id }, withDeleted: true });
  const donations = await donationRepository.findOne({ relations: { user: true }, where: { id: request.params.id } });
  if (!users.isAdmin) {
    if (users.id === donations.user.id) {
      return next();
    }
    throw new AppError("User is not Admin", 404);
  }
  return next();
};

export default ensureOwnerOrAdminMiddleware;
