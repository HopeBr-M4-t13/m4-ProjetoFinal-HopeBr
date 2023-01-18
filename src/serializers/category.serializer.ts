import * as  yup from "yup"
import { SchemaOf } from "yup"
import { ICategoryRequest, ICategoryResponse } from "../interfaces/category/category.interface"
import { IPostCategoryListResponse } from "../interfaces/posts/posts.interface"

import { listAllDonationsResponse} from "./donations.serializers"
import { listAllPostsSerializer, postCategoryListSerializerResponse } from "./post.serializer"


const categorySerializer: SchemaOf<ICategoryRequest> = yup.object().shape({
  name: yup.string().required()
})

const listCategorySerializer: SchemaOf<ICategoryResponse> = yup.object().shape({
  id: yup.string().notRequired(),
  name: yup.string().notRequired(),
  imageUrl: yup.string().notRequired(),
  createdAt: yup.date().notRequired(),
  updatedAt: yup.date().notRequired(),
  donations: listAllDonationsResponse,
  posts: listAllPostsSerializer
})

const categoryResponseSerializer: SchemaOf<ICategoryResponse> = yup.object().shape({
  id: yup.string().notRequired(),
  name: yup.string().notRequired(),
  createdAt: yup.date().notRequired(),
  updatedAt: yup.date().notRequired()
})

const listAllCategorySerializer: SchemaOf<IPostCategoryListResponse[]> = yup.array(postCategoryListSerializerResponse)

export {categorySerializer, listCategorySerializer, categoryResponseSerializer, listAllCategorySerializer}