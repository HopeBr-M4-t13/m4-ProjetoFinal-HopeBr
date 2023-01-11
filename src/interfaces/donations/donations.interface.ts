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
    categoryId: string
    imageId?: string
    userId?: string
    createdAt: Date
    updatedAt: Date
}