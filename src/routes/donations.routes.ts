import { Router } from "express";
import { createDonationController, deleteDonationController, listAllDonationsController, listDonationController, updateDonationController } from "../controllers/donations/donations.controller";

import verifyIdDonationMiddleware from "../middlewares/verifyIdDonation.middleware";
import { donationSerializer, donationUpdateSerializer } from "../serializers/donations.serializers";
import verifyAuthMiddleware from "../middlewares/verifyAuth.middleware";
import verifyDataMiddleware from "../middlewares/verifyData.middleware";
import verifyOwnerOrAdminDonationMiddleware from "../middlewares/verifyOwnerOrAdminDonation.middleware";
import verifyDonationIsActiveMiddleware from "../middlewares/verifyDonationIsActive.middleware";

const donationRoutes = Router();

donationRoutes.post("",verifyAuthMiddleware, verifyDataMiddleware(donationSerializer), createDonationController);
donationRoutes.get("", listAllDonationsController);
donationRoutes.get("/:id", verifyIdDonationMiddleware, verifyDonationIsActiveMiddleware, verifyAuthMiddleware, listDonationController);
donationRoutes.patch("/:id", verifyIdDonationMiddleware, verifyDonationIsActiveMiddleware, verifyAuthMiddleware, verifyOwnerOrAdminDonationMiddleware, verifyDataMiddleware(donationUpdateSerializer), updateDonationController);
donationRoutes.delete("/:id", verifyIdDonationMiddleware, verifyDonationIsActiveMiddleware, verifyAuthMiddleware, verifyOwnerOrAdminDonationMiddleware, deleteDonationController);

export default donationRoutes;