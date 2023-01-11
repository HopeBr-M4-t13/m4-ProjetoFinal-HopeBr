import { Router } from "express";
import { createDonationController, deleteDonationController, listAllDonationsController, listDonationController, updateDonationController } from "../controllers/donations/donations.controller";

import ensureAuthMiddleware from "../middlewares/verifyAuth.middleware";

const donationRoutes = Router();

donationRoutes.post("",ensureAuthMiddleware, createDonationController);
donationRoutes.get("", listAllDonationsController);
donationRoutes.get("/:id",ensureAuthMiddleware, listDonationController);
donationRoutes.patch("/:id", ensureAuthMiddleware, updateDonationController);
donationRoutes.delete("/:id",ensureAuthMiddleware, deleteDonationController);

export default donationRoutes;