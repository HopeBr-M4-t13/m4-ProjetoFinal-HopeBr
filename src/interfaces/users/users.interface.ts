// Request

export interface IAddressRequest {
    city: string
    state: string
    zipCode: string
    district: string
    number: string
}

export interface IUserRequest {
    name: string
    email: string
    password: string
    contact: string
    isAdmin: boolean
    image?: string
    address?: IAddressRequest 
}

export interface IUserBody {
    name: string
    email: string
    password: string
    contact: string
    isAdmin: boolean
    image?: string
    address: IAddressResponse
}

//Response

export interface IAddressResponse {
    id: string
    city: string
    state: string
    zipCode: string
    district: string
    number: string
    createdAt: Date
    updatedAt: Date
}

export interface IImageResponse {
    id?: string
    imageUrl?: string
    createdAt?: Date
    updatedAt?: Date
}

export interface IUserResponse {
    id: string
    name: string
    email: string
    contact: string
    isAdmin: boolean
    isActive: boolean
    image?: IImageResponse | null
    address: IAddressResponse
    createdAt: Date
    updatedAt: Date
}

//Update

export interface IUserUpdate {
    name?: string
    email?: string
    password?: string
    contact?: string
}

export interface IAddressUpdate {
    city?: string
    state?: string
    zipCode?: string
    district?: string
    number?: string
}
