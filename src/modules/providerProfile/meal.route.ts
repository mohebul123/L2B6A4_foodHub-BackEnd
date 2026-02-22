import { Router } from "express";

import auth, { UserRole } from "../../middleware/auth";
import { mealController } from "./meal.controller";

const router = Router();

router.get("/", mealController.getAllMeal);
router.get("/:mealId", mealController.getMealById);
// router.post("/login", authController.login);
// router.get(
//   "/me",
//   auth(UserRole.customer, UserRole.customer),
//   authController.getCurrentUser,
// );
export const mealRouter = router;
