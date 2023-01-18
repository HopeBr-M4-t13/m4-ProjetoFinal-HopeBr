import { Router } from "express";
import { createCategoryController, deleteCategoryController, listCategoryController, listDonationsByCategoryController, listPostsByCategoryController, updateCategoryController } from "../controllers/category/category.controller";
import verifyAdminMiddleware from "../middlewares/verifyAdmin.middleware";
import verifyAuthMiddleware from "../middlewares/verifyAuth.middleware";
import verifyCategoryNameExistsMiddleware from "../middlewares/verifyCategoryNameExists.middleware";
import verifyCategoryIdMiddleware from "../middlewares/verifyCategoryId.middleware";
import verifyDataMiddleware from "../middlewares/verifyData.middleware";
import { categorySerializer } from "../serializers/category.serializer";

const categoryRoutes = Router();

categoryRoutes.get("", verifyAuthMiddleware, listCategoryController);
categoryRoutes.post("", verifyAuthMiddleware, verifyAdminMiddleware, verifyDataMiddleware(categorySerializer), verifyCategoryNameExistsMiddleware, createCategoryController);
categoryRoutes.patch("/:id", verifyAuthMiddleware, verifyAdminMiddleware, verifyDataMiddleware(categorySerializer), verifyCategoryIdMiddleware, verifyCategoryNameExistsMiddleware, updateCategoryController);
categoryRoutes.delete("/:id", verifyAuthMiddleware, verifyAdminMiddleware, verifyCategoryIdMiddleware, deleteCategoryController);
categoryRoutes.get("/:id/donations", verifyAuthMiddleware, verifyCategoryIdMiddleware, listDonationsByCategoryController)
categoryRoutes.get("/:id/posts",  verifyAuthMiddleware, verifyCategoryIdMiddleware, listPostsByCategoryController)

export default categoryRoutes;