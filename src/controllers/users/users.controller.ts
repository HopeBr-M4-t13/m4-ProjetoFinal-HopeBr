import {Request, Response} from "express"
import { IImageRequest } from "../../interfaces/image/image.interface"
import { IAddressUpdate, IUserBody, IUserUpdate } from "../../interfaces/users/users.interface"
import createUserService from "../../services/users/createUser.service"
import deleteUserService from "../../services/users/deleteUser.service"
import imageUpdateService from "../../services/users/imageUpdate.service"
import listAllUsersService from "../../services/users/listAllUsers.service"
import listUserService from "../../services/users/listUser.service"
import updateAddressService from "../../services/users/updateAddress.service"
import updateUserService from "../../services/users/updateUser.service"

export const createUserController = async (req: Request, res: Response) => {
    const reactivateUser = req.reactivateUser
    const userData: IUserBody = req.body
    const user = await createUserService(userData, reactivateUser)
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

export const updateAddressController = async (req: Request, res: Response) => {
    const userId: string = req.params.id
    const addressBody: IAddressUpdate = req.body
    const updateAddress = await updateAddressService(addressBody, userId)
    return res.status(200).json(updateAddress)
}

export const imageUpdateController = async (req: Request, res: Response) => {
    const userId: string = req.params.id
    const imageBody: IImageRequest = req.body
    const imageUpdate = await imageUpdateService(imageBody, userId)
    return res.status(200).json(imageUpdate)
}