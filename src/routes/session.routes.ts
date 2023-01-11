import { Router } from "express";
import sessionUserController from "../controllers/session/session.controller";
import validateData from "../middlewares/validateData.middleware";
import sessionSerializer from "../serializers/session.serializers";

const sessionRoutes = Router();

sessionRoutes.post("", validateData(sessionSerializer), sessionUserController);

export default sessionRoutes;