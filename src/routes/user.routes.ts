import { Router } from "express";
import { createUserController, listAllUsersController, listUserController } from "../controllers/users/users.controller";
import validateData from "../middlewares/validateData.middleware";
import { userRequestSerializer } from "../serializers/users.serializers";

const userRoutes = Router();

userRoutes.post("", validateData(userRequestSerializer), createUserController);
userRoutes.get("", listAllUsersController);
userRoutes.get("/:id", listUserController);
userRoutes.patch("/:id");
userRoutes.delete("/:id");

export default userRoutes;
