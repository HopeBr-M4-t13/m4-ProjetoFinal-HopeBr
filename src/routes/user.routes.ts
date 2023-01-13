import { Router } from "express";
import { createUserController, deleteUserController, listAllUsersController, listUserController, updateUserController } from "../controllers/users/users.controller";
import createAddressMiddleware from "../middlewares/createAddress.middleware";
import createImageMiddleware from "../middlewares/createImage.middleware";
import verifyDataMiddleware from "../middlewares/verifyData.middleware";
import verifyImgAlreadyExistsMiddleware from "../middlewares/verifyImgAlreadyyExists.middlwware";

import { userRequestSerializer, userUpdateSerializer } from "../serializers/users.serializers";

const userRoutes = Router();


userRoutes.post("", verifyDataMiddleware(userRequestSerializer), createAddressMiddleware, verifyImgAlreadyExistsMiddleware, createImageMiddleware, createUserController);
userRoutes.get("", listAllUsersController);
userRoutes.get("/:id", listUserController);
userRoutes.patch("/:id", verifyDataMiddleware(userUpdateSerializer), updateUserController);
userRoutes.delete("/:id", deleteUserController);

export default userRoutes;
