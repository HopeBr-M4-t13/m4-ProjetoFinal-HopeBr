import { Router } from "express";
import {
    createUserController,
    deleteUserController,
    listAllUsersController,
    listUserController,
    updateUserController,
} from "../controllers/users/users.controller";
import createAddressMiddleware from "../middlewares/createAddress.middleware";
import createImageMiddleware from "../middlewares/createImage.middleware";
import validateData from "../middlewares/validateData.middleware";
import ensureIsAdminMiddleware from "../middlewares/verifyAdmin.middleware";
import ensureAuthMiddleware from "../middlewares/verifyAuth.middleware";
import verifyBodyUpdateMiddleware from "../middlewares/verifyBodyUpdateUser.middleware";
import { verifyUserExistsMiddleware } from "../middlewares/verifyEmailUserExists.middleware";
import verifyImgAlredyExists from "../middlewares/verifyImgAlreadyExists.middlwware";
import ensureOwnerOrAdminMiddleware from "../middlewares/verifyOwnerOrAdmin.middleware";
import {
  userRequestSerializer,
  userUpdateSerializer,
} from "../serializers/users.serializers";

const userRoutes = Router();

userRoutes.post(
    "",
    validateData(userRequestSerializer),
    verifyUserExistsMiddleware,
    createAddressMiddleware,
    verifyImgAlredyExists,
    createImageMiddleware,
    createUserController
);
userRoutes.get(
    "",
    ensureAuthMiddleware,
    ensureIsAdminMiddleware,
    listAllUsersController
);
userRoutes.get(
    "/:id",
    ensureAuthMiddleware,
    ensureOwnerOrAdminMiddleware,
    listUserController
);
userRoutes.patch(
    "/:id",
    ensureAuthMiddleware,
    ensureOwnerOrAdminMiddleware,
    verifyBodyUpdateMiddleware,
    validateData(userUpdateSerializer),
    updateUserController
);
userRoutes.delete(
    "/:id",
    ensureAuthMiddleware,
    ensureOwnerOrAdminMiddleware,
    deleteUserController
);

export default userRoutes;
