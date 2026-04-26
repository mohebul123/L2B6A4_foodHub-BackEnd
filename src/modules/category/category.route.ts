import { Router } from "express";

import auth, { UserRole } from "../../middleware/auth";
import { CategoryController } from "./category.controller";
import validateRequest from "../../middleware/validateRequest";
import { createCategorySchema } from "../../schemas/category.schema";

const router = Router();
router.post(
  "/",
  validateRequest(createCategorySchema),
  auth(UserRole.admin),
  CategoryController.createCategory,
);
router.get("/", CategoryController.getAllCategories);
router.delete("/:id", CategoryController.deleteCategory);
// router.get("/", categoryController.getAllCategory);
// router.get("/:providerId", providerController.getProviderById);
// router.post("/meals", auth(UserRole.provider), providerController.createMeal);
// router.post("/meals", providerController.getProviderById);

export const categoryRouter = router;
