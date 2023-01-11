import {Request, Response} from "express"
import { IUserRequest, IUserUpdate } from "../../interfaces/users"
import createUserService from "../../services/users/createUser.service"
import deleteUserService from "../../services/users/deleteUser.service"
import listAllUsersService from "../../services/users/listAllUsers.service"
import listUserService from "../../services/users/listUser.service"
import updateUserService from "../../services/users/updateUser.service"

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

export const updateUserController = async (req: Request, res: Response) => {
    const userId: string = req.params.id
    const dataUpdate: IUserUpdate = req.body
    const userUpdate = await updateUserService(userId, dataUpdate)
    return res.status(200).json(userUpdate)
}

export const deleteUserController = async (req: Request, res: Response) => {
    const userId: string = req.params.id
    const deleteUser = await deleteUserService(userId)
    return res.status(204).json(deleteUser)
}