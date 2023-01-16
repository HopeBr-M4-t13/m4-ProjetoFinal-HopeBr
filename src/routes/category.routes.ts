import { Router } from "express";
import { createCategoryController, listCategoryController, updateCateryController } from "../controllers/category/category.controller";
import verifyAdminMiddleware from "../middlewares/verifyAdmin.middleware";
import verifyAuthMiddleware from "../middlewares/verifyAuth.middleware";
import verifyCateryExistsMiddleware from "../middlewares/verifyCateryExists.middleware";
import verifyCateryIdMiddleware from "../middlewares/verifyCateryId.middleware";
import verifyDataMiddleware from "../middlewares/verifyData.middleware";
import { categorySerializer } from "../serializers/category.serializer";

const categoryRoutes = Router();

// Criar Categoria - somente Admin / nao deixar crairr com o mesmo nome - FEITO
// Listar Categoria - user logado - FEITO
// Atualizar Categoria - somente Admin
// Deletar Categoria - somente Admin
// Listar donations pelo id da category - user logado
// Listar posts pelo id da catergory - user logado 

categoryRoutes.get("", verifyAuthMiddleware, listCategoryController);
categoryRoutes.post("", verifyAuthMiddleware, verifyAdminMiddleware, verifyDataMiddleware(categorySerializer), verifyCateryExistsMiddleware, createCategoryController);
categoryRoutes.patch("/:id", verifyAuthMiddleware, verifyAdminMiddleware, verifyDataMiddleware(categorySerializer), verifyCateryIdMiddleware, verifyCateryExistsMiddleware, updateCateryController)

export default categoryRoutes;