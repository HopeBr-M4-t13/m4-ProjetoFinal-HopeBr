import { ICategoryResponse } from "../category/category.interface"
import { IImageResponse } from "../image/image.interface"

interface IDonationRequest {
    name: string
    description: string
    donated?: boolean
    image?: string
    category: string
}

interface IDonationResponse {
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

interface IUserDonationResponse {
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

interface IResponseCreateDonation {
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

export {IDonationRequest, IDonationResponse, IUserDonationResponse, IResponseCreateDonation}


