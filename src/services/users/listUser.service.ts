import AppDataSource from "../../data-source"
import { User } from "../../entities/user.entity"
import { IUserResponse } from "../../interfaces/users"
import { userResponseSerializer } from "../../serializers/users.serializers"

const listUserService = async (userId: string): Promise<IUserResponse> => {
    const usersRep = AppDataSource.getRepository(User)

    const user = usersRep.findOneBy({
        id: userId
    })

    const dataResponse = userResponseSerializer.validate(user, {
        stripUnknown: true
    })

    return dataResponse
}

export default listUserService