import {Request, Response, NextFunction} from "express"
import AppError from "./AppError"


const handleError = async(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction) => {

    if(error instanceof AppError){
        return res.status(error.statusCode).json({message: error.message})
    }

    }
export default handleError