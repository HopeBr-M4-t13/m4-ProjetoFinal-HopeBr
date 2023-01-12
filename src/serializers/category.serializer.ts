import * as  yup from "yup"
import { SchemaOf } from "yup"
import { ICategoryRequest, ICategoryResponse } from "../interfaces/category/category.interface"


export const categorySerializer: SchemaOf<ICategoryRequest> = yup.object().shape({
  name: yup.string().required()
})

export const listCategoySerializer: SchemaOf<ICategoryResponse> = yup.object().shape({
  id: yup.string().notRequired(),
  name: yup.string().notRequired(),
  imageUrl: yup.string().notRequired(),
  createdAt: yup.string().notRequired(),
  updatedAt: yup.string().notRequired()
})

export const listAllCategorySerilizer: SchemaOf<ICategoryResponse[]> = yup.array(listCategoySerializer)

