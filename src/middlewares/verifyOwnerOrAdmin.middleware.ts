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

  if (!users && !request.user.isAdmin) {
    throw new AppError("Its not owner or admin", 401);
  }
  return next();
};

export default verifyOwnerOrAdminMiddleware;
