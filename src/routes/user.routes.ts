import { Router } from "express";
import { createUserController, deleteUserController, imageUpdateController, listAllUsersController, listUserController, updateAddressController, updateUserController } from "../controllers/users/users.controller";
import createAddressMiddleware from "../middlewares/createAddress.middleware";
import verifyDataMiddleware from "../middlewares/verifyData.middleware";
import ensureIsAdminMiddleware from "../middlewares/verifyAdmin.middleware";
import verifyAuthMiddleware from "../middlewares/verifyAuth.middleware";
import verifyBodyUpdateMiddleware from "../middlewares/verifyBodyUpdateUser.middleware";
import verifyEmailExistsMiddleware from "../middlewares/verifyEmailUserExists.middleware";
import verifyOwnerOrAdminMiddleware from "../middlewares/verifyOwnerOrAdmin.middleware";
import { addressUpdateSerializer, imageUpdateSerializer, userRequestSerializer, userUpdateSerializer } from "../serializers/users.serializers";
import verifyUserExistsMiddleware from "../middlewares/verifyUserExists.middleware";

const userRoutes = Router();

userRoutes.post("", verifyDataMiddleware(userRequestSerializer), verifyEmailExistsMiddleware, createAddressMiddleware, createUserController);
userRoutes.get("", verifyAuthMiddleware, ensureIsAdminMiddleware, listAllUsersController);
userRoutes.get("/:id", verifyUserExistsMiddleware, verifyAuthMiddleware, verifyOwnerOrAdminMiddleware, listUserController);
userRoutes.patch("/:id", verifyUserExistsMiddleware, verifyAuthMiddleware, verifyOwnerOrAdminMiddleware, verifyBodyUpdateMiddleware, verifyEmailExistsMiddleware, verifyDataMiddleware(userUpdateSerializer), updateUserController);
userRoutes.delete("/:id", verifyUserExistsMiddleware, verifyAuthMiddleware, verifyOwnerOrAdminMiddleware, deleteUserController);
userRoutes.patch("/:id/address", verifyUserExistsMiddleware, verifyAuthMiddleware, verifyOwnerOrAdminMiddleware, verifyDataMiddleware(addressUpdateSerializer), updateAddressController);
userRoutes.patch("/:id/image", verifyUserExistsMiddleware, verifyAuthMiddleware, verifyOwnerOrAdminMiddleware, verifyDataMiddleware(imageUpdateSerializer), imageUpdateController);


export default userRoutes;
