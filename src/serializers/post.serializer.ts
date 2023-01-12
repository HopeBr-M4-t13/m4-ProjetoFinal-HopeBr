import * as  yup from "yup"
import { SchemaOf } from "yup"
import { iEditPostRequest, iPostRequest } from "../interfaces/posts/posts.interface"

const createPostSerializer: SchemaOf<iPostRequest> = yup.object().shape({
  title: yup.string().required(),
  content: yup.string().required(),
  category: yup.string().required()
})

const editPostSerializer: SchemaOf<iEditPostRequest> = yup.object().shape({
  title: yup.string().notRequired(),
  content: yup.string().notRequired(),
  category: yup.string().notRequired()
})

export { createPostSerializer, editPostSerializer, }