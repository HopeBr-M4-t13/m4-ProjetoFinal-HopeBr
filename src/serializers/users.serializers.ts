import * as  yup from "yup"
import {SchemaOf} from "yup"
import { IImageRequest } from "../interfaces/image/image.interface"
import { IAddressUpdate, IUserRequest, IUserResponse, IUserUpdate } from "../interfaces/users/users.interface"

const userRequestSerializer: SchemaOf<IUserRequest> = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    contact: yup.string().required(),
    isAdmin: yup.boolean().required(),
    image: yup.string().notRequired(),
    address: yup.object({
        city: yup.string().required(),
        state: yup.string().required(),
        zipCode: yup.string().required(),
        district: yup.string().required(),
        number: yup.string().required()
    }).required(),
})

const userResponseSerializer: SchemaOf<IUserResponse> = yup.object().shape({
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
    }).notRequired().nullable(),
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

const userUpdateSerializer: SchemaOf<IUserUpdate> = yup.object().shape({
    name: yup.string().notRequired(),
    email: yup.string().email().notRequired(),
    password: yup.string().notRequired(),
    contact: yup.string().notRequired()
})

const addressUpdateSerializer: SchemaOf<IAddressUpdate> = yup.object({
    city: yup.string().notRequired(),
    state: yup.string().notRequired(),
    zipCode: yup.string().notRequired(),
    district: yup.string().notRequired(),
    number: yup.string().notRequired()
})

const imageUpdateSerializer: SchemaOf<IImageRequest> = yup.object({
    imageUrl: yup.string().required()
})

const listUsersResponse: SchemaOf<IUserResponse[]> = yup.array(userResponseSerializer)

export {userRequestSerializer, userResponseSerializer, userUpdateSerializer, addressUpdateSerializer, imageUpdateSerializer, listUsersResponse}