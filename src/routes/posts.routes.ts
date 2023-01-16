import { Router } from "express";
import {
	createPostController,
	deletePostController,
	listPostController,
	listUniquePostController,
	updatePostController,
} from "../controllers/posts/posts.controller";
import verifyAuthMiddleware from "../middlewares/verifyAuth.middleware";
import verifycategoryExistsMiddleware from "../middlewares/verifyCategoryExists.middlesware";
import verifyDataMiddleware from "../middlewares/verifyData.middleware";
import verifyOwnerOrAdminMiddleware from "../middlewares/verifyOwnerOrAdmin.middleware";
import { createPostSerializer } from "../serializers/post.serializer";

const postRoutes = Router();

postRoutes.post(
	"",
	verifyAuthMiddleware,
	verifyDataMiddleware(createPostSerializer),
	verifycategoryExistsMiddleware,
	createPostController
);
postRoutes.get("", verifyAuthMiddleware, listPostController);
postRoutes.get("/:id", verifyAuthMiddleware, listUniquePostController);
postRoutes.patch("/:id", verifyAuthMiddleware, updatePostController);
postRoutes.delete("/:id", verifyAuthMiddleware, deletePostController);

export default postRoutes;
