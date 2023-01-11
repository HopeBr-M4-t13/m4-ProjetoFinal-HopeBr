import { Router } from "express";
import { createUserController, deleteUserController, listAllUsersController, listUserController, updateUserController } from "../controllers/users/users.controller";
import validateData from "../middlewares/validateData.middleware";
import { userRequestSerializer, userUpdateSerializer } from "../serializers/users.serializers";

const userRoutes = Router();

userRoutes.post("",validateData(userRequestSerializer), createUserController);
userRoutes.get("", listAllUsersController);
userRoutes.get("/:id", listUserController);
userRoutes.patch("/:id", validateData(userUpdateSerializer), updateUserController);
userRoutes.delete("/:id", deleteUserController);

export default userRoutes;
