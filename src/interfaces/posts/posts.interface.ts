export interface iPostRequest {
  title: string,
  content: string,
  category?: string,
  user?: string
}

export interface iPostResponse {
  id: string,
  title: string,
  content: string,
  category: string,
  createdAt: string,
  updatedAt: string
}

export interface iEditPostRequest {
  title?: string,
  content?: string,
  category?: string
}

