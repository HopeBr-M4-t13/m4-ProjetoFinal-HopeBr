import { Request, Response, NextFunction } from "express";
import { validate } from "uuid";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import AppError from "../errors/AppError";

const verifyIdIsValidMiddleware = async (request: Request, response: Response, next: NextFunction) => {
  const userRepository = AppDataSource.getRepository(User);
  const userId = await userRepository.findOne({ where: { id: request.params.id }});
  const validateId = validate(request.params.id)

  if(!validateId) {
      throw new AppError("Uuid Invalid", 400)
  }

  if (!userId) {
    throw new AppError("User not exist", 404);
  }
  return next();
};

export default verifyIdIsValidMiddleware;
