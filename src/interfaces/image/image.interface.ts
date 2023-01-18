interface IImageRequest{
    imageUrl: string 
}

interface IImageResponse{
    id: string,
    imageUrl: string,
    createdAt: Date
    updatedAt: Date
}

export {IImageRequest, IImageResponse}