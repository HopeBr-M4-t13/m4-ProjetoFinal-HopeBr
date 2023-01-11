import AppDataSource from "../../data-source"
import { User } from "../../entities/user.entity"
import { IUserResponse } from "../../interfaces/users/users.interface"
import { userResponseSerializer } from "../../serializers/users.serializers"

const listUserService = async (userId: string): Promise<IUserResponse> => {
    const usersRep = AppDataSource.getRepository(User)

    const user = await usersRep.findOneBy({
        id: userId
    })

    const dataResponse = userResponseSerializer.validate(user, {
        stripUnknown: true
    })

    return dataResponse
}

export default listUserService