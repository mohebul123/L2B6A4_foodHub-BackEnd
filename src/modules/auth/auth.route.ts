import { Router } from "express";
import { authController } from "./auth.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get(
  "/me",
  auth(UserRole.customer, UserRole.customer),
  authController.getCurrentUser,
);
export const authRouter = router;
