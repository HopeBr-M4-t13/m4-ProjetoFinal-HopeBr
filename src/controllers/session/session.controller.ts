import iSessionUserRequest from "../../interfaces/session/session.interface"
import sessionUserService from "../../services/session/session.service"
import {Request, Response} from "express"

const sessionUserController = async (req:Request, res:Response) => {
    const userData:iSessionUserRequest = req.body
    const token = await sessionUserService(userData)
    return res.status(200).json({token})
}
export default sessionUserController