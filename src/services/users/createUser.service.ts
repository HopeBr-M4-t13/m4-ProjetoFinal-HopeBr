import AppDataSource from "../../data-source";
import { Address } from "../../entities/address.entity";
import { Image } from "../../entities/image.entity";
import { User } from "../../entities/user.entity";
import { IUserResponse } from "../../interfaces/users/users.interface";
import { userResponseSerializer } from "../../serializers/users.serializers";

const createUserService = async (data): Promise<IUserResponse> => {
    const usersRep = AppDataSource.getRepository(User)
    const addressesRep = AppDataSource.getRepository(Address)
    const imagesRep = AppDataSource.getRepository(Image)

    const findImage = await imagesRep.findOneBy({
        id: data.image.id
    })

    const findAddress = await addressesRep.findOneBy({
        id: data.address.id
    })

    const createUser = usersRep.create({...data, address: findAddress, image: findImage})
    await usersRep.save(createUser)

    const dataResponse = await userResponseSerializer.validate(createUser, {
        stripUnknown: true
    })

    return dataResponse
}

export default createUserService;