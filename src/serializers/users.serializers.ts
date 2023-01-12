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
    }).required(),
})

export const userResponseSerializer: SchemaOf<IUserResponse> = yup.object().shape({
    id: yup.string().notRequired(),
    email: yup.string().email().notRequired(),
    name: yup.string().notRequired(),
    contact: yup.string().notRequired(),
    isAdmin: yup.boolean().notRequired(),
    isActive: yup.boolean().notRequired(),
    image: yup.object({
        id: yup.string().notRequired(),
        imageUrl: yup.string().notRequired(),
        createdAt: yup.date().notRequired(),
        updatedAt: yup.date().notRequired()
    }).notRequired(),
    address: yup.object({
        id: yup.string().notRequired(),
        city: yup.string().notRequired(),
        state: yup.string().notRequired(),
        zipCode: yup.string().notRequired(),
        district: yup.string().notRequired(),
        number: yup.string().notRequired(),
        createdAt: yup.date().notRequired(),
        updatedAt: yup.date().notRequired(),
    }).notRequired(),
    createdAt: yup.date().notRequired(),
    updatedAt: yup.date().notRequired()
})

export const userUpdateSerializer = yup.object().shape({
    name: yup.string().notRequired(),
    email: yup.string().email().notRequired(),
    password: yup.string().notRequired(),
    contact: yup.string().notRequired()
})

export const listUsersResponse: SchemaOf<IUserResponse[]> = yup.array(userResponseSerializer)