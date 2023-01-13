export interface ICategoryRequest {
  name: string
}

export interface ICategoryResponse {
  id?: string,
  name?: string,
  imageUrl?: string,
  createdAt?: Date,
  updatedAt?: Date
}
