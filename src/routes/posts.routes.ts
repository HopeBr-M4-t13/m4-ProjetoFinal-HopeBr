import {Router} from "express"
import { createPostController, deletePostController, listPostController, listUniquePostController, updatePostController } from "../controllers/posts/posts.controller";
import validateData from "../middlewares/validateData.middleware";
import ensureAuthMiddleware from "../middlewares/verifyAuth.middleware";
import ensureOwnerOrAdminMiddleware from "../middlewares/verifyOwnerOrAdmin.middleware";
import { createPostSerializer } from "../serializers/post.serializer";

const postRoutes = Router();

postRoutes.post("", ensureAuthMiddleware, validateData(createPostSerializer), createPostController);
postRoutes.get("", ensureAuthMiddleware, listPostController);
postRoutes.get("/:id", ensureAuthMiddleware, listUniquePostController);
postRoutes.patch("/:id", ensureAuthMiddleware, ensureOwnerOrAdminMiddleware, updatePostController);
postRoutes.delete("/:id", ensureAuthMiddleware, ensureOwnerOrAdminMiddleware, deletePostController);

export default postRoutes;