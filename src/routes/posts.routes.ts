import {Router} from "express"
import { createPostController, deletePostController, listPostController, listUniquePostController, updatePostController } from "../controllers/posts/posts.controller";
import verifyAuthMiddleware from "../middlewares/verifyAuth.middleware";
import ensureOwnerOrAdminMiddleware from "../middlewares/verifyOwnerOrAdmin.middleware";
import { createPostSerializer } from "../serializers/post.serializer";

const postRoutes = Router();

postRoutes.post("", verifyAuthMiddleware, validateData(createPostSerializer), createPostController);
postRoutes.get("", verifyAuthMiddleware, listPostController);
postRoutes.get("/:id", verifyAuthMiddleware, listUniquePostController);
postRoutes.patch("/:id", verifyAuthMiddleware, ensureOwnerOrAdminMiddleware, updatePostController);
postRoutes.delete("/:id", verifyAuthMiddleware, ensureOwnerOrAdminMiddleware, deletePostController);

export default postRoutes;