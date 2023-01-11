import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserRequest } from "../../interfaces/users";
import { userResponseSerializer } from "../../serializers/users.serializers";

const createUserService = async (data) => {
    const usersRep = AppDataSource.getRepository(User)

    const createUser = usersRep.create(data)
    await usersRep.save(createUser)

    const dataResponse = await userResponseSerializer.validate(createUser, {
        stripUnknown: true
    })

    return dataResponse
}

export default createUserService;