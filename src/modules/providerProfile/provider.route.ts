import { Router } from "express";

import { providerController } from "./provider.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = Router();
router.post("/", auth(UserRole.provider), providerController.createProvider);
router.get("/", providerController.getAllProvider);
router.get("/:providerId", providerController.getProviderById);
router.post("/meals", auth(UserRole.provider), providerController.createMeal);
// router.post("/meals", providerController.getProviderById);

export const providerRouter = router;
