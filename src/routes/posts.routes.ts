import {Router} from "express"
import { createPostController, deletePostController, listPostController, listUniquePostController, updatePostController } from "../controllers/posts/posts.controller";
import verifyAuthMiddleware from "../middlewares/verifyAuth.middleware";
import verifyDataMiddleware from "../middlewares/verifyData.middleware";
import verifyOwnerOrAdminMiddleware from "../middlewares/verifyOwnerOrAdmin.middleware";
import { createPostSerializer } from "../serializers/post.serializer";

const postRoutes = Router();

postRoutes.post("", verifyAuthMiddleware, verifyDataMiddleware(createPostSerializer), createPostController);
postRoutes.get("", verifyAuthMiddleware, listPostController);
postRoutes.get("/:id", verifyAuthMiddleware, listUniquePostController);
postRoutes.patch("/:id", verifyAuthMiddleware, verifyOwnerOrAdminMiddleware, updatePostController);
postRoutes.delete("/:id", verifyAuthMiddleware, verifyOwnerOrAdminMiddleware, deletePostController);

export default postRoutes;