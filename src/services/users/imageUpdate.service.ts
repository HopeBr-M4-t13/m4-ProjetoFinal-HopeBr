import AppDataSource from "../../data-source";
import { Image } from "../../entities/image.entity";
import { User } from "../../entities/user.entity";
import { IImageRequest } from "../../interfaces/image/image.interface";

const imageUpdateService =async (imageBody: IImageRequest, userId: string): Promise<Image> => {
    const usersRep = AppDataSource.getRepository(User)
    const imageRep = AppDataSource.getRepository(Image)

    const findUser = await usersRep.findOne({
        where: {
            id: userId
        },
        relations: {
            image: true
        }
    })

    const findImage = await imageRep.findOneBy({
        id: findUser.image.id
    })

    const updateImage = imageRep.create({
        ...findImage,
        ...imageBody
    })
    await imageRep.save(updateImage)

    return updateImage
} 

export default imageUpdateService;