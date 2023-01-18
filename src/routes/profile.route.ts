import { Router } from "express";
import profileController from "../controllers/profile/profile.controller";
import verifyAuthMiddleware from "../middlewares/verifyAuth.middleware";

const profileRoutes = Router();

profileRoutes.get("", verifyAuthMiddleware, profileController );

export default profileRoutes;