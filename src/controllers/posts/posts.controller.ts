import { Request, Response } from 'express';
import createUserService from '../../services/users/createUser.service';

const createPostController = async (req: Request, res: Response) => {
  const category = req.body

  const newCategory = await createUserService(category)
  return res.status(201).json(newCategory)
}

export { createPostController }