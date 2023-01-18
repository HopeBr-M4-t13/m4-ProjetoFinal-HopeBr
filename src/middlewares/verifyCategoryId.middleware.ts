import { Request, Response, NextFunction } from "express"
import dataSource from "../data-source";
import { Category } from "../entities/category.entity";
import AppError from "../errors/AppError";
import { validate } from "uuid";

const verifyCategoryIdMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const categoriesRep = dataSource.getRepository(Category)
    const categoryId = req.params.id
    const validateId = validate(req.params.id)

    if(!validateId) {
        throw new AppError("Uuid Invalid", 400)
    }

    const findCategory = await categoriesRep.findOneBy({
        id: categoryId
    })

    if(!findCategory) {
        throw new AppError("Category not found", 404)
    }

    return next()
};

export default verifyCategoryIdMiddleware;