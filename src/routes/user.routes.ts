import { Router } from "express";
import { createUserController, deleteUserController, listAllUsersController, listUserController, updateUserController } from "../controllers/users/users.controller";
import createAddressMiddleware from "../middlewares/createAddress.middleware";
import createImageMiddleware from "../middlewares/createImage.middleware";
import validateData from "../middlewares/validateData.middleware";
import verifyImgAlredyExists from "../middlewares/verifyImgAlreadyExists.middlwware";
import { userRequestSerializer, userUpdateSerializer } from "../serializers/users.serializers";

const userRoutes = Router();


userRoutes.post("", validateData(userRequestSerializer), createAddressMiddleware, verifyImgAlredyExists, createImageMiddleware, createUserController);
userRoutes.get("", listAllUsersController);
userRoutes.get("/:id", listUserController);
userRoutes.patch("/:id", validateData(userUpdateSerializer), updateUserController);
userRoutes.delete("/:id", deleteUserController);

export default userRoutes;
