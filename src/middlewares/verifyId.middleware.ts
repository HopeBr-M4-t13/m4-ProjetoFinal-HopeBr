import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import AppError from "../errors/AppError";

const ensureIdIsValidMiddleware = async (request: Request, response: Response, next: NextFunction) => {
  const userRepository = AppDataSource.getRepository(User);
  const userId = await userRepository.findOne({ where: { id: request.params.id }});
  if (!userId) {
    throw new AppError("User not exist", 404);
  }
  return next();
};

export default ensureIdIsValidMiddleware;
