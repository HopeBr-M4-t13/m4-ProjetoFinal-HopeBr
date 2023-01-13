import { Request, Response, NextFunction } from "express"
import AppDataSource from "../data-source";
import { Image } from "../entities/image.entity";

const createImageMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const imagesRep = AppDataSource.getRepository(Image)
    const imageUrl = req.body.image
        
    const createImage = imagesRep.create({imageUrl: imageUrl})
    await imagesRep.save(createImage)
        
    req.body.image = createImage    
    
    return next()
}

export default createImageMiddleware;