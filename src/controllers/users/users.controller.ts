import {Request, Response} from "express"
import { IUserRequest } from "../../interfaces/users"
import createUserService from "../../services/users/createUser.service"
import listAllUsersService from "../../services/users/listAllUsers.service"
import listUserService from "../../services/users/listUser.service"

export const createUserController = async (req: Request, res: Response) => {
    const userData: IUserRequest = req.body
    const user = await createUserService(userData)
    return res.status(201).json(user)
}

export const listAllUsersController = async (req: Request, res: Response) => {
    const listUsers = await listAllUsersService()
    return res.status(200).json(listUsers)
}

export const listUserController = async (req: Request, res: Response) => {
    const userId: string = req.params.id
    const user = await listUserService(userId)
    return res.status(200).json(user)
}