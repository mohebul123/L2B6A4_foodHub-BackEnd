import { Router } from "express";
import { userController } from "./user.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = Router();

router.get("/", auth(UserRole.admin), userController.getAllUser);

export const userRouter = router;
