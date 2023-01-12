interface iPostRequest {
  title: string,
  content: string,
  category: string
}

interface iPostResponse {
  id: string,
  title: string,
  content: string,
  category: string,
  createdAt: string,
  updatedAt: string
}

interface iEditPostRequest {
  title?: string,
  content?: string,
  category?: string
}

export { iPostRequest, iPostResponse, iEditPostRequest }