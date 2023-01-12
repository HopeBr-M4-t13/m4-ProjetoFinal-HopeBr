import * as  yup from "yup"
import { SchemaOf } from "yup"
import { iEditPostRequest, iPostRequest } from "../interfaces/posts/posts.interface"

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