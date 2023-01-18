// Request

interface IAddressRequest {
    city: string
    state: string
    zipCode: string
    district: string
    number: string
}

interface IUserRequest {
    name: string
    email: string
    password: string
    contact: string
    isAdmin: boolean
    image?: string
    address?: IAddressRequest 
}

interface IUserBody {
    name: string
    email: string
    password: string
    contact: string
    isAdmin: boolean
    image?: string
    address: IAddressResponse
}

//Response

interface IAddressResponse {
    id: string
    city: string
    state: string
    zipCode: string
    district: string
    number: string
    createdAt: Date
    updatedAt: Date
}

interface IImageResponse {
    id?: string
    imageUrl?: string
    createdAt?: Date
    updatedAt?: Date
}

interface IUserResponse {
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

interface IUserUpdate {
    name?: string
    email?: string
    password?: string
    contact?: string
}

interface IAddressUpdate {
    city?: string
    state?: string
    zipCode?: string
    district?: string
    number?: string
}

export {IAddressRequest, IUserRequest, IUserBody, IAddressResponse, IImageResponse, IUserResponse, IUserUpdate, IAddressUpdate}
