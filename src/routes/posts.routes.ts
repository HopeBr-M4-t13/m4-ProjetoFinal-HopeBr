import {Router} from "express"
import { createPostController, deletePostController, editPostController, listPostController, listUniquePostController } from "../controllers/posts/posts.controller";
import verifyAuthMiddleware from "../middlewares/verifyAuth.middleware";

const postRoutes = Router();

postRoutes.post("", verifyAuthMiddleware, createPostController);
postRoutes.get("", listPostController);
postRoutes.get("/:id", listUniquePostController);
postRoutes.patch("/:id", editPostController);
postRoutes.delete("/:id", deletePostController);

export default postRoutes;