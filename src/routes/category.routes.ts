import { Router } from "express";
import { listCategoryController } from "../controllers/category/category.controller";

const categoryRoutes = Router();

categoryRoutes.get("", listCategoryController);
categoryRoutes.get("/:id");

export default categoryRoutes;