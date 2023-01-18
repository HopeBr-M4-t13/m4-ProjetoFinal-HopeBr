import { IDonationResponse } from "../donations/donations.interface"
import { iPostResponse } from "../posts/posts.interface"

export interface ICategoryRequest {
  name: string
}

export interface ICategoryResponse {
  id: string,
  name: string,
  createdAt: Date,
  updatedAt: Date
}

export interface ICategoryListResponse{
  id?: string,
  name?: string,
  imageUrl?: string,
  createdAt?: Date,
  updatedAt?: Date,
  donations: IDonationResponse,
  posts: iPostResponse
}


