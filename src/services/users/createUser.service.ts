import AppDataSource from "../../data-source";
import { Address } from "../../entities/address.entity";
import { Image } from "../../entities/image.entity";
import { User } from "../../entities/user.entity";
import AppError from "../../errors/AppError";
import { IUserBody, IUserResponse } from "../../interfaces/users/users.interface";
import { userResponseSerializer } from "../../serializers/users.serializers";

const createUserService = async (data: IUserBody): Promise<IUserResponse> => {
    const usersRep = AppDataSource.getRepository(User)
    const addressesRep = AppDataSource.getRepository(Address)
    const imagesRep = AppDataSource.getRepository(Image)

    let image = {
        imageUrl: data.image
    }

    if(data.image) {
        const findImage = await imagesRep.findOne({
            where: {
                imageUrl: data.image
            }
        })

        if(findImage) {
            throw new AppError("Image alredy's exists", 409)
        }

        image = imagesRep.create({
            imageUrl: data.image
        })
        await imagesRep.save(image)
    }

    const findAddress = await addressesRep.findOneBy({
        id: data.address.id
    })

    const createUser = usersRep.create({...data, address: findAddress, image: image})
    await usersRep.save(createUser)


    const dataResponse = await userResponseSerializer.validate(createUser, {
        stripUnknown: true
    })

    return dataResponse
}

export default createUserService;