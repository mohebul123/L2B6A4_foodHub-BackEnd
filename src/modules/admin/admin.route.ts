import { Router } from "express";
import { adminController } from "./admin.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = Router();

router.get("/users", auth(UserRole.admin), adminController.getAllUsers);

router.patch(
  "/users/:userId",
  auth(UserRole.admin),
  adminController.updateUserStatus,
);
export const adminRouter = router;
