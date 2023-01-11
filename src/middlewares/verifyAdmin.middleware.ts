import { Request, Response, NextFunction } from "express";
import AppError from "../errors/AppError";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";

const ensureIsAdminMiddleware = async (request: Request, response: Response, next: NextFunction) => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.findOne({ where: { id: request.user.id }, withDeleted: true });

  if (!users.isAdmin) {
    throw new AppError("User is not admin", 403);
  }
  return next();
};

export default ensureIsAdminMiddleware;
