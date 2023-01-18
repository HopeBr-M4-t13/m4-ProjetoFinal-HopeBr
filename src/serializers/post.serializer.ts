import * as yup from "yup";
import { SchemaOf } from "yup";
import {
	IUpdatePostRequest,
	IPostCategoryListResponse,
	IPostRequest,
	IPostResponse,
} from "../interfaces/posts/posts.interface";

import { userResponseSerializer } from "./users.serializers";

const createPostSerializer: SchemaOf<IPostRequest> = yup.object().shape({
	title: yup.string().required(),
	content: yup.string().required(),
	category: yup.string().required(),
});

const updatePostSerializer: SchemaOf<IUpdatePostRequest> = yup
	.object()
	.shape({
		title: yup.string().notRequired(),
		content: yup.string().notRequired(),
		category: yup.string().notRequired(),
	});

const createPostSerializerResponse: SchemaOf<IPostResponse> = yup
	.object()
	.shape({
		id: yup.string().required(),
		title: yup.string().required(),
		content: yup.string().required(),
		category: yup.object().shape({
			id: yup.string().notRequired(),
			name: yup.string().notRequired(),
			createdAt: yup.date().notRequired(),
			updatedAt: yup.date().notRequired(),
		}),
		user: userResponseSerializer,
		createdAt: yup.date().required(),
		updatedAt: yup.date().required(),
	});

const postCategoryListSerializerResponse: SchemaOf<IPostCategoryListResponse> =
	yup.object().shape({
		id: yup.string().notRequired(),
		title: yup.string().notRequired(),
		content: yup.string().notRequired(),
		createdAt: yup.date().notRequired(),
		updatedAt: yup.date().notRequired(),
	});

const listAllPostsSerializer: SchemaOf<IPostCategoryListResponse[]> =
	yup.array(createPostSerializerResponse);


export {createPostSerializer, updatePostSerializer, createPostSerializerResponse, postCategoryListSerializerResponse, listAllPostsSerializer}