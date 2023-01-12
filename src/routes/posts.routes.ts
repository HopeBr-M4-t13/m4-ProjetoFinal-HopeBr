import {Router} from "express"
import { createPostController } from "../controllers/posts/posts.controller";

const postRoutes = Router();

postRoutes.post("", createPostController);
postRoutes.get("");
postRoutes.get("/:id");
postRoutes.patch("/:id");
postRoutes.delete("/:id");

export default postRoutes;