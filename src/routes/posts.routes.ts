import { Router } from "express";
import {
	createPostController,
	deletePostController,
	listPostController,
	listUniquePostController,
	updatePostController,
} from "../controllers/posts/posts.controller";
import verifyAuthMiddleware from "../middlewares/verifyAuth.middleware";
import verifyCategoryIdBodyExistsMiddleware from "../middlewares/verifyCategoryIdBodyExists.middleware";
import verifyDataMiddleware from "../middlewares/verifyData.middleware";
import verifyOwnerOrAdminPostMiddleware from "../middlewares/verifyOwnerOrAdminPost.middleware";
import { createPostSerializer } from "../serializers/post.serializer";

const postRoutes = Router();

postRoutes.post(
	"",
	verifyAuthMiddleware,
	verifyDataMiddleware(createPostSerializer),
	verifyCategoryIdBodyExistsMiddleware,
	createPostController
);
postRoutes.get("", verifyAuthMiddleware, listPostController);
postRoutes.get("/:id", verifyAuthMiddleware, listUniquePostController);
postRoutes.patch(
	"/:id",
	verifyAuthMiddleware,
	verifyOwnerOrAdminPostMiddleware,
	updatePostController
);
postRoutes.delete(
	"/:id",
	verifyAuthMiddleware,
	verifyOwnerOrAdminPostMiddleware,
	deletePostController
);

export default postRoutes;
