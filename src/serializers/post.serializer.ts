import * as  yup from "yup"
import { SchemaOf } from "yup"
import { iUpdatePostRequest, iPostCategoryListResponse, iPostRequest, iPostResponse } from "../interfaces/posts/posts.interface"
import { categoryResponseSerializer, listCategorySerializer } from "./category.serializer"

export const createPostSerializer: SchemaOf<iPostRequest> = yup.object().shape({
  title: yup.string().required(),
  content: yup.string().required(),
  category: yup.string().notRequired(),
  user: yup.string().notRequired()
})

export const updatePostSerializer: SchemaOf<iUpdatePostRequest> = yup.object().shape({
  title: yup.string().notRequired(),
  content: yup.string().notRequired(),
  category: yup.string().notRequired()
})

export const createPostSerializerResponse: SchemaOf<iPostResponse> = yup.object().shape({
  id: yup.string().required(),
  title: yup.string().required(),
  content: yup.string().required(),
  category: categoryResponseSerializer,
  createdAt: yup.date().required(),
  updatedAt: yup.date().required()
})

export const postCategoryListSerializerResponse: SchemaOf<iPostCategoryListResponse> = yup.object().shape({
  id: yup.string().notRequired(),
  title: yup.string().notRequired(),
  content: yup.string().notRequired(),
  createdAt: yup.date().notRequired(),
  updatedAt: yup.date().notRequired()
})

export const listAllPostsSerializer: SchemaOf<iPostCategoryListResponse[]> = yup.array(createPostSerializerResponse)
