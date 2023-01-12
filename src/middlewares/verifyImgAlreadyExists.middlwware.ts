import { Request, Response, NextFunction } from "express"
import AppDataSource from "../data-source";
import { Image } from "../entities/image.entity";
import AppError from "../errors/AppError";

const verifyImgAlredyExists = async (req: Request, res: Response, next: NextFunction) => {
    const imagesRep = AppDataSource.getRepository(Image)
    const dataImage = req.body.image
        
    const findImage = await imagesRep.findOneBy({
        imageUrl: dataImage
    })
        
    if(findImage) {
        throw new AppError("That's image alredy exists", 409)
    }
    
    return next()
}

export default verifyImgAlredyExists;