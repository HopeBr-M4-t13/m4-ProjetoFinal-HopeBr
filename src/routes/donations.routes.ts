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
donationRoutes.get("/:id", verifyIdDonationMiddleware, ensureAuthMiddleware, ensureOwnerOrAdminMiddleware, listDonationController);
donationRoutes.patch("/:id", verifyIdDonationMiddleware, ensureAuthMiddleware, ensureOwnerOrAdminMiddleware, verifyNameDonationMiddleware, validateData(donationUpdateSerializer), updateDonationController);
donationRoutes.delete("/:id", verifyIdDonationMiddleware, ensureAuthMiddleware, ensureOwnerOrAdminMiddleware, deleteDonationController);

export default donationRoutes;