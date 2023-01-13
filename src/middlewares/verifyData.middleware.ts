import {Request, Response, NextFunction} from "express"
import {AnySchema} from "yup"
import AppError from "../errors/AppError"

const verifyDataMiddleware = (Schema: AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedBody = await Schema.validate(req.body, {
            stripUnknown: true,
            abortEarly: false
        }) 
        req.body = validatedBody
    } catch (error) {
        throw new AppError(error.errors, 400)  
    }

    return next()
}
export default verifyDataMiddleware