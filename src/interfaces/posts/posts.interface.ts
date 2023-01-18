import { ICategoryResponse } from "../category/category.interface";
import { IUserResponse } from "../users/users.interface";

interface IPostRequest {
	title: string;
	content: string;
	category: string;
}
interface IPostUpdateRequest {
	title?: string;
	content?: string;
	category?: string;
	user?: string;
}

interface IPostResponse {
	id: string;
	title: string;
	content: string;
	createdAt: Date;
	updatedAt: Date;
	category: ICategoryResponse;
}

interface IPostListResponse {
	id: string;
	title: string;
	content: string;
	createdAt: Date;
	updatedAt: Date;
	category: ICategoryResponse;
	user: IUserResponse;
}

interface IPostCategoryListResponse {
	id: string;
	title: string;
	content: string;
	createdAt?: Date;
	updatedAt?: Date;
}

interface IUpdatePostRequest {
	title?: string;
	content?: string;
	category?: string;
}

export {IPostRequest, IPostUpdateRequest, IPostResponse, IPostListResponse, IPostCategoryListResponse, IUpdatePostRequest}
