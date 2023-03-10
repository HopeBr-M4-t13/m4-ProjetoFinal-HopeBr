import { Request, Response, NextFunction } from "express"
import { Category } from "../entities/category.entity";
import AppDataSource from "../data-source"
import AppError from "../errors/AppError";

const verifyCategoryNameExistsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const categoryRep = AppDataSource.getRepository(Category)

    const findCategory = await categoryRep.findOneBy({
        name: req.body.name
    })

    if(findCategory) {
        throw new AppError("Category already exists", 409)
    }

    return next()
}

export default verifyCategoryNameExistsMiddleware;