import { Router } from "express";
import { listcategoryController } from "../controllers/category/category.controller";

const categoryRoutes = Router();

categoryRoutes.get("", listcategoryController);
categoryRoutes.get("/:id");

export default categoryRoutes;