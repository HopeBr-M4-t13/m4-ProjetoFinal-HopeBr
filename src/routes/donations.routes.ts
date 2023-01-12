import { Router } from "express";
import { createDonationController, deleteDonationController, listAllDonationsController, listDonationController, updateDonationController } from "../controllers/donations/donations.controller";
import donationIsActive from "../middlewares/donationIsActive.middleware";
import validateData from "../middlewares/validateData.middleware";
import ensureAuthMiddleware from "../middlewares/verifyAuth.middleware";
import verifyIdDonationMiddleware from "../middlewares/verifyIdDonation.middleware";
import ensureOwnerOrAdminMiddleware from "../middlewares/verifyOwnerOrAdmin.middleware";
import { donationSerializer, donationUpdateSerializer } from "../serializers/donations.serializers";

const donationRoutes = Router();

donationRoutes.post("",ensureAuthMiddleware, validateData(donationSerializer), createDonationController);
donationRoutes.get("", listAllDonationsController);
donationRoutes.get("/:id", verifyIdDonationMiddleware, donationIsActive, ensureAuthMiddleware, ensureOwnerOrAdminMiddleware, listDonationController);
donationRoutes.patch("/:id", verifyIdDonationMiddleware, donationIsActive, ensureAuthMiddleware, ensureOwnerOrAdminMiddleware, validateData(donationUpdateSerializer), updateDonationController);
donationRoutes.delete("/:id", verifyIdDonationMiddleware, donationIsActive, ensureAuthMiddleware, ensureOwnerOrAdminMiddleware, deleteDonationController);

export default donationRoutes;