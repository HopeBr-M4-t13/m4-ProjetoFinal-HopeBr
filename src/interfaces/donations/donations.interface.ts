import { ICategoryResponse } from "../category/category.interface"
import { IImageResponse } from "../image/image.interface"
import { IUserResponse } from "../users/users.interface"

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
    createdAt: Date
    updatedAt: Date
}