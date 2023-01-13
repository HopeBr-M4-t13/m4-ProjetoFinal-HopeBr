import { Router } from "express";
import { createUserController, deleteUserController, imageUpdateController, listAllUsersController, listUserController, updateAddressController, updateUserController } from "../controllers/users/users.controller";
import createAddressMiddleware from "../middlewares/createAddress.middleware";
import createImageMiddleware from "../middlewares/createImage.middleware";
import verifyDataMiddleware from "../middlewares/verifyData.middleware";
import ensureIsAdminMiddleware from "../middlewares/verifyAdmin.middleware";
import ensureAuthMiddleware from "../middlewares/verifyAuth.middleware";
import verifyBodyUpdateMiddleware from "../middlewares/verifyBodyUpdateUser.middleware";
import verifyEmailExistsMiddleware from "../middlewares/verifyEmailUserExists.middleware";
import verifyImgAlredyExists from "../middlewares/verifyImgAlreadyyExists.middlwware";
import ensureOwnerOrAdminMiddleware from "../middlewares/verifyOwnerOrAdmin.middleware";
import { addressUpdateSerializer, imageUpdateSerializer, userRequestSerializer, userUpdateSerializer } from "../serializers/users.serializers";
import verifyUserExistsMiddleware from "../middlewares/verifyUserExists.middleware";

const userRoutes = Router();

userRoutes.post("", verifyDataMiddleware(userRequestSerializer), verifyEmailExistsMiddleware, createAddressMiddleware, createUserController);
userRoutes.get("", ensureAuthMiddleware, ensureIsAdminMiddleware, listAllUsersController);
userRoutes.get("/:id", verifyUserExistsMiddleware, ensureAuthMiddleware, ensureOwnerOrAdminMiddleware, listUserController);
userRoutes.patch("/:id", verifyUserExistsMiddleware, ensureAuthMiddleware, ensureOwnerOrAdminMiddleware, verifyBodyUpdateMiddleware, verifyEmailExistsMiddleware, verifyDataMiddleware(userUpdateSerializer), updateUserController);
userRoutes.delete("/:id", verifyUserExistsMiddleware, ensureAuthMiddleware, ensureOwnerOrAdminMiddleware, deleteUserController);
userRoutes.patch("/:id/address", verifyUserExistsMiddleware, ensureAuthMiddleware, ensureOwnerOrAdminMiddleware, verifyDataMiddleware(addressUpdateSerializer), updateAddressController);
userRoutes.patch("/:id/image", verifyUserExistsMiddleware, ensureAuthMiddleware, ensureOwnerOrAdminMiddleware, verifyDataMiddleware(imageUpdateSerializer), imageUpdateController);


export default userRoutes;
