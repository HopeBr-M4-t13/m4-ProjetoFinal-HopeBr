import { Request, Response, NextFunction } from "express"
import AppError from "../errors/AppError";

const verifyBodyUpdateMiddleware = async ( req: Request, res: Response, next: NextFunction ) => {
    const keys = Object.keys(req.body)

    if(keys.includes("isAdmin") || keys.includes("isActive")) {
        throw new AppError("Bad Request", 400)
    }

    return next()
}

export default verifyBodyUpdateMiddleware;