import { Router } from "express";
import { createDonationController, deleteDonationController, listAllDonationsController, listDonationController, updateDonationController } from "../controllers/donations/donations.controller";
import createImageMiddleware from "../middlewares/createImage.middleware";
import validateData from "../middlewares/validateData.middleware";

import ensureAuthMiddleware from "../middlewares/verifyAuth.middleware";
import verifyIdDonationMiddleware from "../middlewares/verifyIdDonation.middleware";
import verifyImgAlredyExists from "../middlewares/verifyImgAlreadyExists.middlwware";
import verifyNameDonationMiddleware from "../middlewares/verifyNameDonation.middleware";
import ensureOwnerOrAdminMiddleware from "../middlewares/verifyOwnerOrAdmin.middleware";
import { donationSerializer, donationUpdateSerializer } from "../serializers/donations.serializers";

const donationRoutes = Router();

donationRoutes.post("",ensureAuthMiddleware, validateData(donationSerializer), verifyNameDonationMiddleware, verifyImgAlredyExists, createImageMiddleware, createDonationController);
donationRoutes.get("", listAllDonationsController);
donationRoutes.get("/:id", ensureAuthMiddleware, ensureOwnerOrAdminMiddleware, verifyIdDonationMiddleware, listDonationController);
donationRoutes.patch("/:id", ensureAuthMiddleware, ensureOwnerOrAdminMiddleware, verifyIdDonationMiddleware, verifyNameDonationMiddleware, validateData(donationUpdateSerializer), updateDonationController);
donationRoutes.delete("/:id",ensureAuthMiddleware, ensureOwnerOrAdminMiddleware, verifyIdDonationMiddleware, deleteDonationController);

export default donationRoutes;