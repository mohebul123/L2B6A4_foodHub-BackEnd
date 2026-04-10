import { Router } from "express";
import { authController } from "./auth.controller";
import auth, { UserRole } from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { loginSchema, registerSchema } from "../../schemas/user.schema";

const router = Router();

router.post(
  "/register",
  validateRequest(registerSchema),
  authController.register,
);
router.post("/login", validateRequest(loginSchema), authController.login);
router.get(
  "/me",
  auth(UserRole.customer, UserRole.admin, UserRole.provider),
  authController.getCurrentUser,
);
export const authRouter = router;
