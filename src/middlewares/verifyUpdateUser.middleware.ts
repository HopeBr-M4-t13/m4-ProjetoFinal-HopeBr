import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError";

export const verifyUpdateUserMiddleware = async(req: Request, res: Response, next: NextFunction) =>{

    const setBody = req.body

    const dataKeys = Object.keys(setBody)

    if(dataKeys.includes("isAdm") || dataKeys.includes("isActive") || dataKeys.includes("id")){
        throw new AppError('it is not allowed to edit the fields: isActive, IsAdm and id', 401)
    }

    return next();
}