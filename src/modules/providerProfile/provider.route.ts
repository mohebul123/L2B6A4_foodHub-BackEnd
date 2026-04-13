import { Router } from "express";

import { providerController } from "./provider.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = Router();
router.post(
  "/profile",
  auth(UserRole.provider, UserRole.customer),
  providerController.createProviderProfile,
);
router.get(
  "/profile",
  auth(UserRole.provider),
  providerController.getOwnProviderProfile,
);
router.patch(
  "/profile",
  auth(UserRole.provider),
  providerController.updateOwnProviderProfile,
);
router.get("/", providerController.getAllProvider);
router.get("/:providerId", providerController.getProviderById);
router.post("/meals", auth(UserRole.provider), providerController.createMeal);
router.put(
  "/meals/:mealId",
  auth(UserRole.provider),
  providerController.updateMealbyId,
);
router.patch(
  "/orders/:orderId/status",
  auth(UserRole.provider),
  providerController.updateOrderStatus,
);
// router.post("/meals", providerController.getProviderById);

export const providerRouter = router;
