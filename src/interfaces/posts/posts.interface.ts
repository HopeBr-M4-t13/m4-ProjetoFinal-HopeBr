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

export { iPostRequest, iPostResponse }