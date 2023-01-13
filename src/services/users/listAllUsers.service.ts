import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserResponse } from "../../interfaces/users/users.interface";
import { listUsersResponse } from "../../serializers/users.serializers";

const listAllUsersService = async (): Promise<IUserResponse[]> => {
    const usersRep = AppDataSource.getRepository(User)

    const listUsers = await usersRep.find({
        relations: {
            address: true,
            image: true
        }
    })

    const dataResponse = listUsersResponse.validate(listUsers, {
        stripUnknown: true
    })

    return dataResponse
}

export default listAllUsersService;