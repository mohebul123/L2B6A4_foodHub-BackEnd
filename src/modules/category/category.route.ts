import { Router } from "express";

import auth, { UserRole } from "../../middleware/auth";
import { categoryController } from "./category.controller";

const router = Router();
router.post("/", auth(UserRole.admin), categoryController.createCategory);
router.get("/", categoryController.getAllCategory);
// router.get("/:providerId", providerController.getProviderById);
// router.post("/meals", auth(UserRole.provider), providerController.createMeal);
// router.post("/meals", providerController.getProviderById);

export const categoryRouter = router;
