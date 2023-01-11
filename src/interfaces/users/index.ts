export interface IAddress {
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
    address?: IAddress 
}

export interface IUserResponse {
    id: string
    email: string
    contact: string
    isAdmin: boolean
    isActive: boolean
    imageId?: string
    addressId?: string
    createAt: Date
    updateAt: Date
}

export interface IUserUpdate {
    name?: string
    email?: string
    password?: string
    contact?: string
}