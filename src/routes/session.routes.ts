import { Router } from "express";
import sessionUserController from "../controllers/session/session.controller";
import verifyDataMiddleware from "../middlewares/verifyData.middleware";
import sessionSerializer from "../serializers/session.serializers";

const sessionRoutes = Router();

sessionRoutes.post("", verifyDataMiddleware(sessionSerializer), sessionUserController);

export default sessionRoutes;