import { NextFunction, Request, Response } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import AppError from "../errors/AppError";


export const verifyUserExistsMiddleware = async(req: Request, res: Response, next: NextFunction) =>{
    const userRepository = AppDataSource.getRepository(User)

    const userExists = await userRepository.findOneBy({
        email: req.body.email
    })


    if(userExists){
        throw new AppError('Email alredy is exists', 409);
    }

    return next();
}