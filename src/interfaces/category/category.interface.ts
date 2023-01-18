import { IDonationResponse } from "../donations/donations.interface"
import { IPostResponse } from "../posts/posts.interface"

interface ICategoryRequest {
  name: string
}

interface ICategoryResponse {
  id: string,
  name: string,
  createdAt: Date,
  updatedAt: Date
}

interface ICategoryListResponse{
  id?: string,
  name?: string,
  imageUrl?: string,
  createdAt?: Date,
  updatedAt?: Date,
  donations: IDonationResponse,
  posts: IPostResponse
}

export {ICategoryRequest, ICategoryResponse, ICategoryListResponse}
