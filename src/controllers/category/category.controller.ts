import { Request, Response } from 'express';
import listCategoryService from '../../services/category/listCategory.service';

const listCategoryController = async (req: Request, res: Response) => {
  const listPost = await listCategoryService()

  return res.status(201).json(listPost)
}

export { listCategoryController }