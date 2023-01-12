import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserResponse, IUserUpdate } from "../../interfaces/users/users.interface";
import { userResponseSerializer } from "../../serializers/users.serializers";

const updateUserService = async (userId: string , dataUpdate: IUserUpdate): Promise<IUserResponse> => {
    const usersRep = AppDataSource.getRepository(User)

    const findUser = await usersRep.findOneBy({
        id: userId
    })

    const updateUser = usersRep.create({
        ...findUser,
        ...dataUpdate
    })
    await usersRep.save(updateUser)

    const dataResponse = userResponseSerializer.validate(updateUser, {
        stripUnknown: true
    })

    return dataResponse
}

export default updateUserService;