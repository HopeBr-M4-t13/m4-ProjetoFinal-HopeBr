import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";

const deleteUserService = async (userId: string): Promise<{}> => {
    const usersRep = AppDataSource.getRepository(User)
    
    const findUser = await usersRep.findOneBy({
        id: userId
    })

    findUser.isActive = false

    await usersRep.save(findUser)

    return {}
}

export default deleteUserService;