import { compare } from "bcryptjs"
import jwt from "jsonwebtoken"
import AppDataSource from "../../data-source"
import { User } from "../../entities/user.entity"
import AppError from "../../errors/AppError"
import ISessionUserRequest from "../../interfaces/session/session.interface"

const sessionUserService = async(userData:ISessionUserRequest):Promise<string> => {
    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.findOneBy({
        email: userData.email
    })

    if(!user){
        throw new AppError("Email or password invalid", 404)
    }

    const passwordMatch = await compare(userData.password, user.password)

    if(!passwordMatch) {
        throw new AppError("Email or password invalid", 404)
    }

    const token = jwt.sign(
        {
            isActive: user.isActive,
            isAdmin: user.isAdmin
        },
            process.env.SECRET_KEY,
        {
            subject: user.id,
            expiresIn: "72h",
        }
    )

    if (user.isActive === false){
        throw new AppError("This user is not active!", 400)
    }

    return token
}
export default sessionUserService