import {Router} from "express"

const postRoutes = Router();

postRoutes.post("");
postRoutes.get("");
postRoutes.get("/:id");
postRoutes.patch("/:id");
postRoutes.delete("/:id");

export default postRoutes;