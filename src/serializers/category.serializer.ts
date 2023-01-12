import * as  yup from "yup"
import { SchemaOf } from "yup"
import { iCategoryRequest, iCategoryResponse } from "../interfaces/category/category.interface"

export const categorySerializer: SchemaOf<iCategoryRequest> = yup.object().shape({
  name: yup.string().required()
})

export const listCategoySerializer: SchemaOf<iCategoryResponse> = yup.object().shape({
  id: yup.string().notRequired(),
  name: yup.string().notRequired(),
  createdAt: yup.string().notRequired(),
  updatedAt: yup.string().notRequired()
})

export const listAllCategorySerilizer: SchemaOf<iCategoryResponse[]> = yup.array(listCategoySerializer)

