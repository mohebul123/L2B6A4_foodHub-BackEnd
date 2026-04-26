import { Router } from "express";

import auth, { UserRole } from "../../middleware/auth";
import { mealController } from "./meal.controller";

const router = Router();

router.get("/", mealController.getAllMeal);
router.get("/:mealId", mealController.getMealById);
export const mealRouter = router;
