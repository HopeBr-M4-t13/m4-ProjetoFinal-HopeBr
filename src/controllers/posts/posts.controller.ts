import { Request, Response } from "express";
import createPostService from "../../services/posts/createPost.service";
import deletePostService from "../../services/posts/deletePost.service";
import listPostService from "../../services/posts/listPost.service";
import uniquePostService from "../../services/posts/listUniquePost.service";
import updatePostService from "../../services/posts/updatePost.service";

export const createPostController = async (req: Request, res: Response) => {
	const category = req.body;
	const id = req.user.id;

	const newCategory = await createPostService(category, id);
	return res.status(201).json(newCategory);
};

export const listPostController = async (req: Request, res: Response) => {
	const listPost = await listPostService();

	return res.status(200).json(listPost);
};

export const listUniquePostController = async (req: Request, res: Response) => {
	const postId = req.params.id;
	const post = await uniquePostService(postId);

	return res.status(200).json(post);
};

export const updatePostController = async (req: Request, res: Response) => {
	const postId = req.params.id;
	const postBody = req.body;
	const post = await updatePostService(postId, postBody);

	return res.status(200).json(post);
};

export const deletePostController = async (req: Request, res: Response) => {
	const postId = req.params.id;
	const post = await deletePostService(postId);

	return res.status(204).json(post);
};
