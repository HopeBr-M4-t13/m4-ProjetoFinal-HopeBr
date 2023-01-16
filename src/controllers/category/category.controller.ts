import { Request, Response } from 'express';
import { ICategoryRequest } from '../../interfaces/category/category.interface';
import createCategoryService from '../../services/category/createCategory.service';
import listCategoryService from '../../services/category/listCategory.service';

const listCategoryController = async (req: Request, res: Response) => {
  const listPost = await listCategoryService()

  return res.status(201).json(listPost)
}

const createCategoryController = async (req: Request, res: Response) => {
  const categoryRequest: ICategoryRequest = req.body
  const newCategory = await createCategoryService(categoryRequest)
  return res.status(200).json(newCategory)
}

export { listCategoryController, createCategoryController }