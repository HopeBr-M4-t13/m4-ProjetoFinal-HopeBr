import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { listUsersResponse } from "../../serializers/users.serializers";

const listAllUsersService = async () => {
    const usersRep = AppDataSource.getRepository(User)

    const listUsers = await usersRep.find()

    const dataResponse = listUsersResponse.validate(listUsers, {
        stripUnknown: true
    })

    return dataResponse
}

export default listAllUsersService;