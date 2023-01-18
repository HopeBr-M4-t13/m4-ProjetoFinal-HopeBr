import { Router } from "express";
import { createDonationController, deleteDonationController, listAllDonationsController, listDonationController, updateDonationController } from "../controllers/donations/donations.controller";
import donationIsActiveMiddleware from "../middlewares/donationIsActive.middleware"
import verifyIdDonationMiddleware from "../middlewares/verifyIdDonation.middleware";
import verifyOwnerOrAdminMiddleware from "../middlewares/verifyOwnerOrAdmin.middleware";
import { donationSerializer, donationUpdateSerializer } from "../serializers/donations.serializers";
import verifyAuthMiddleware from "../middlewares/verifyAuth.middleware";
import verifyDataMiddleware from "../middlewares/verifyData.middleware";
import verifyOwnerOrAdminDonationMiddleware from "../middlewares/verifyOwnerOrAdminDonation.middleware";

const donationRoutes = Router();

donationRoutes.post("",verifyAuthMiddleware, verifyDataMiddleware(donationSerializer), createDonationController);
donationRoutes.get("", listAllDonationsController);
donationRoutes.get("/:id", verifyIdDonationMiddleware, donationIsActiveMiddleware, verifyAuthMiddleware, listDonationController);
donationRoutes.patch("/:id", verifyIdDonationMiddleware, donationIsActiveMiddleware, verifyAuthMiddleware, verifyOwnerOrAdminDonationMiddleware, verifyDataMiddleware(donationUpdateSerializer), updateDonationController);
donationRoutes.delete("/:id", verifyIdDonationMiddleware, donationIsActiveMiddleware, verifyAuthMiddleware, verifyOwnerOrAdminDonationMiddleware, deleteDonationController);

export default donationRoutes;