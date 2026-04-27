import { Router } from "express";

import { providerController } from "./provider.controller";
// import auth, { UserRole } from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import {
  createMealSchema,
  createProviderProfileSchema,
  updateMealSchema,
  updateProviderProfileSchema,
} from "../../schemas/providerProfile.schemas";
import auth, { UserRole } from "../../middleware/auth";

const router = Router();
router.post(
  "/profile",
  validateRequest(createProviderProfileSchema),
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
  validateRequest(updateProviderProfileSchema),
  auth(UserRole.provider),
  providerController.updateOwnProviderProfile,
);
router.get("/", providerController.getAllProvider);
router.get("/my-meals", auth(UserRole.provider), providerController.getMyMeals);
router.get("/:providerId", providerController.getProviderById);
router.post(
  "/meals",
  auth(UserRole.provider),
  validateRequest(createMealSchema),
  providerController.createMeal,
);
router.put(
  "/meals/:mealId",
  // validateRequest(updateMealSchema),
  auth(UserRole.provider),
  providerController.updateMealbyId,
);
router.patch(
  "/orders/:orderId/status",
  auth(UserRole.provider),
  providerController.updateOrderStatus,
);

router.get("/my-meals", auth(UserRole.provider), providerController.getMyMeals);

export const providerRouter = router;
