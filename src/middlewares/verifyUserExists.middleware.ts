import { Request, Response, NextFunction } from "express"
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import AppError from "../errors/AppError";

const verifyUserExistsMiddleware = async ( req: Request, res: Response, next: NextFunction ) => {
    const usersRep = AppDataSource.getRepository(User)
    const userId = req.params.id

    if(userId.length !== 36) {
        throw new AppError("Uuid Invalid", 400)
    }

    const findUser = await usersRep.findOne({
        where: {
            id: userId
        }
    })

    if(!findUser) {
        throw new AppError("User not found", 404)
    }

    if(!findUser.isActive) {
        throw new AppError("User not found", 404)
    }

    return next()
}

export default verifyUserExistsMiddleware;