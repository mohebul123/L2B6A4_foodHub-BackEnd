import { Router } from "express";
import { userController } from "./user.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = Router();

router.get("/", auth(UserRole.admin), userController.getAllUser);
router.patch(
  "/update-profile",
  auth(UserRole.admin, UserRole.provider, UserRole.customer),
  userController.updateMyProfile,
);

export const userRouter = router;
