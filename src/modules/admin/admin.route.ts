import { Router } from "express";
import { adminController } from "./admin.controller";
import auth, { UserRole } from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { updateCategorySchema } from "../../schemas/category.schema";

const router = Router();

router.get("/users", auth(UserRole.admin), adminController.getAllUsers);

router.patch(
  "/users/:userId",
  validateRequest(updateCategorySchema),
  auth(UserRole.admin),
  adminController.updateUserStatus,
);
export const adminRouter = router;
