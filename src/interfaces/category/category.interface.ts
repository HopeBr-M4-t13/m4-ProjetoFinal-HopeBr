interface iCategoryRequest {
  name: string,
}

interface iCategoryResponse {
  "id": string,
  "name": string,
  "createdAt": string,
  "updatedAt": string
}

export { iCategoryRequest, iCategoryResponse }