import { Router } from "express";
import { createDonationController, deleteDonationController, listAllDonationsController, listDonationController, updateDonationController } from "../controllers/donations/donations.controller";
import createImageMiddleware from "../middlewares/createImage.middleware";
import validateData from "../middlewares/validateData.middleware";

import ensureAuthMiddleware from "../middlewares/verifyAuth.middleware";
import verifyImgAlredyExists from "../middlewares/verifyImgAlreadyExists.middlwware";
import ensureOwnerOrAdminMiddleware from "../middlewares/verifyOwnerOrAdmin.middleware";
import { donationSerializer, donationUpdateSerializer } from "../serializers/donations.serializers";

const donationRoutes = Router();

donationRoutes.post("",ensureAuthMiddleware, validateData(donationSerializer), verifyImgAlredyExists, createImageMiddleware, createDonationController);
donationRoutes.get("", listAllDonationsController);
donationRoutes.get("/:id", ensureAuthMiddleware, ensureOwnerOrAdminMiddleware, listDonationController);
donationRoutes.patch("/:id", ensureAuthMiddleware, ensureOwnerOrAdminMiddleware ,validateData(donationUpdateSerializer), updateDonationController);
donationRoutes.delete("/:id",ensureAuthMiddleware, ensureOwnerOrAdminMiddleware, deleteDonationController);

export default donationRoutes;