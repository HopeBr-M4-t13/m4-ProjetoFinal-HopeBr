import { Router } from "express";
import { listCategoryController } from "../controllers/category/category.controller";
import verifyAuthMiddleware from "../middlewares/verifyAuth.middleware";

const categoryRoutes = Router();

// Criar Categoria - somente Admin / nao deixar crairr com o mesmo nome
// Atualizar Categoria - somente Admin
// Deletar Categoria - somente Admin
// Listar Categoria - user logado
// Listar donations pelo id da category - user logado
// Listar posts pelo id da catergory - user logado 

categoryRoutes.get("", verifyAuthMiddleware, listCategoryController);
categoryRoutes.get("/:id");

export default categoryRoutes;