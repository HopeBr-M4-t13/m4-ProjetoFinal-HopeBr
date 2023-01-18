import { Request, Response } from 'express';
import { ICategoryRequest } from '../../interfaces/category/category.interface';
import createCategoryService from '../../services/category/createCategory.service';
import deleteCategoryService from '../../services/category/deleteCategory.service';
import listCategoryService from '../../services/category/listCategory.service';
import listDonationsByCategoryService from '../../services/category/listDonationsByCategory.service';
import listPostsByCategoryService from '../../services/category/listPostsByCategory.service';
import updateCateryService from '../../services/category/updateCatery.service';

const listCategoryController = async (req: Request, res: Response) => {
  const listPost = await listCategoryService()
  return res.status(200).json(listPost)
}

const createCategoryController = async (req: Request, res: Response) => {
  const categoryRequest: ICategoryRequest = req.body
  const newCategory = await createCategoryService(categoryRequest)
  return res.status(201).json(newCategory)
}

const updateCateryController = async (req: Request, res: Response) => {
  const categoryId: string = req.params.id
  const categoryRequest: ICategoryRequest = req.body
  const updatedCategory = await updateCateryService(categoryId, categoryRequest)
  return res.status(200).json(updatedCategory)
}

const deleteCategoryController = async (req: Request, res: Response) => {
  const categoryId: string = req.params.id
  const deletedCategory = await deleteCategoryService(categoryId)
  return res.status(204).json(deletedCategory)
}

const listDonationsByCategoryController = async (req: Request, res: Response) => {
  const categoryId: string = req.params.id
  const listDonationsByCategory = await listDonationsByCategoryService(categoryId)
  return res.status(200).json(listDonationsByCategory)
}

const listPostsByCategoryController = async (req: Request, res: Response) => {
  const categoryId: string = req.params.id
  const listPostsByCategory = await listPostsByCategoryService(categoryId)
  return res.status(200).json(listPostsByCategory)
}

export { listCategoryController, createCategoryController, updateCateryController, deleteCategoryController, listDonationsByCategoryController, listPostsByCategoryController }