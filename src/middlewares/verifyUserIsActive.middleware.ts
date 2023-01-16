import { Request, Response, NextFunction } from "express"
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import AppError from "../errors/AppError";

const verifyUserIsActiveMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const usersRep = AppDataSource.getRepository(User)
    
    const email = req.body.email

    const findUser = await usersRep.findOneBy({
        email: email
    })

    if(!findUser) {
        throw new AppError("Email or password invalid", 401)
    }

    if(!findUser.isActive) {
        throw new AppError("User not found", 404)
    }

    return next()
}

export default verifyUserIsActiveMiddleware;