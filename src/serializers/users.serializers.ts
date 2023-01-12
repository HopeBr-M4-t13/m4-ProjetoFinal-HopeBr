import * as  yup from "yup"
import {SchemaOf} from "yup"
import { IUserRequest, IUserResponse } from "../interfaces/users/users.interface"

export const userRequestSerializer: SchemaOf<IUserRequest> = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    contact: yup.string().required(),
    isAdmin: yup.boolean().required(),
    image: yup.string().required(),
    address: yup.object({
        city: yup.string().required(),
        state: yup.string().required(),
        zipCode: yup.string().required(),
        district: yup.string().required(),
        number: yup.string().required()
    }).notRequired(),
})

export const userResponseSerializer: SchemaOf<IUserResponse> = yup.object().shape({
    id: yup.string().notRequired(),
    email: yup.string().email().notRequired(),
    contact: yup.string().notRequired(),
    isAdmin: yup.boolean().notRequired(),
    isActive: yup.boolean().notRequired(),
    imageId: yup.string().notRequired(),
    addressId: yup.string().notRequired(),
    createdAt: yup.date().required(),
    updatedAt: yup.date().required()
})

export const userUpdateSerializer = yup.object().shape({
    name: yup.string().notRequired(),
    email: yup.string().email().notRequired(),
    password: yup.string().notRequired(),
    contact: yup.string().notRequired(),
})

export const listUsersResponse: SchemaOf<IUserResponse[]> = yup.array(userResponseSerializer)