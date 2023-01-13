import { ICategoryResponse } from "../category/category.interface"
import { IUserResponse } from "../users/users.interface"

export interface iPostRequest {
  title: string,
  content: string,
  category?: string,
  user?: string
}
export interface iPostUpdateRequest {
  title?: string,
  content?: string,
  category?: string,
  user?: string
}

export interface iPostResponse {
  id: string,
  title: string,
  content: string,
  createdAt: Date,
  updatedAt: Date,
  category: ICategoryResponse
}

export interface iPostListResponse {
  id: string,
  title: string,
  content: string,
  createdAt: Date,
  updatedAt: Date,
  category: ICategoryResponse,
  user: IUserResponse
}

export interface iPostCategoryListResponse {
  id: string,
  title: string,
  content: string,
  createdAt: Date,
  updatedAt: Date
}

export interface iUpdatePostRequest {
  title?: string,
  content?: string,
  category?: string
}

