import { NextFunction, Request, Response } from "express";
import AppDataSource from "../data-source";
import { Category } from "../entities/category.entity"; 
import AppError from "../errors/AppError";


const verifyCategoryIdBodyExistsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const userRepository = AppDataSource.getRepository(Category)

  const validCategory = await userRepository.findOneBy({
    id: req.body.category
  })

  if (validCategory) {
    return next()
  }  
  throw new AppError('Category not found', 404); 
}

export default verifyCategoryIdBodyExistsMiddleware