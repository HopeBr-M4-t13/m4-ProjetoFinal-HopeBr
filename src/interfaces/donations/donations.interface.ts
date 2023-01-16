import { ICategoryResponse } from "../category/category.interface"
import { IImageResponse } from "../image/image.interface"
import { IUserRequest, IUserResponse } from "../users/users.interface"

export interface IDonationRequest {
    name: string
    description: string
    donated?: boolean
    image?: string
    category: string
}

export interface IDonationResponse {
    id: string
    name: string
    description: string
    donated: boolean
    category: string
    image?: string
    user?: string
    isActive: boolean
    createdAt: Date
    updatedAt: Date
}

export interface IUserDonationResponse {
    id: string
    name: string
    email: string
    contact: string
    isAdmin: boolean
    isActive: boolean
    image?: string
    address?: string
    createdAt: Date
    updatedAt: Date
}

export interface IResponseCreateDonation {
    id: string
    name: string
    description: string
    donated: boolean
    isActive: boolean
    category: ICategoryResponse | null
    image?: IImageResponse | null
    user?: IUserDonationResponse
    createdAt: Date
    updatedAt: Date
}


