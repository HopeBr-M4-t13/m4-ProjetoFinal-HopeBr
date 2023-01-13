import * as  yup from "yup"
import { SchemaOf } from "yup"
import { ICategoryRequest, ICategoryResponse } from "../interfaces/category/category.interface"
import { iPostCategoryListResponse } from "../interfaces/posts/posts.interface"
import { listAllDonationsResponse} from "./donations.serializers"
import { listAllPostsSerializer, postCategoryListSerializerResponse } from "./post.serializer"


export const categorySerializer: SchemaOf<ICategoryRequest> = yup.object().shape({
  name: yup.string().required()
})

export const listCategorySerializer: SchemaOf<ICategoryResponse> = yup.object().shape({
  id: yup.string().notRequired(),
  name: yup.string().notRequired(),
  imageUrl: yup.string().notRequired(),
  createdAt: yup.date().notRequired(),
  updatedAt: yup.date().notRequired(),
  donations: listAllDonationsResponse,
  posts: listAllPostsSerializer
})

export const listAllCategorySerializer: SchemaOf<iPostCategoryListResponse[]> = yup.array(postCategoryListSerializerResponse)

