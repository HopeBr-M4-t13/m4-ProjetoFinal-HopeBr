import * as  yup from "yup"
import { SchemaOf } from "yup"
import { iEditPostRequest, iPostRequest, iPostResponse } from "../interfaces/posts/posts.interface"
import { listCategorySerializer } from "./category.serializer"

export const createPostSerializer: SchemaOf<iPostRequest> = yup.object().shape({
  title: yup.string().required(),
  content: yup.string().required(),
  category: yup.string().notRequired(),
  user: yup.string().notRequired()
})

export const editPostSerializer: SchemaOf<iEditPostRequest> = yup.object().shape({
  title: yup.string().notRequired(),
  content: yup.string().notRequired(),
  category: yup.string().notRequired()
})

export const createPostSerializerResponse: SchemaOf<iPostResponse> = yup.object().shape({
  id: yup.string().required(),
  title: yup.string().required(),
  content: yup.string().required(),
  category: listCategorySerializer,
  createdAt: yup.string().required(),
  updatedAt: yup.string().required()
})

export const listAllPostsSerilizer: SchemaOf<iPostResponse[]> = yup.array(createPostSerializerResponse)