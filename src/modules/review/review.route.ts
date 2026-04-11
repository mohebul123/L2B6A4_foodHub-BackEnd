import { Router } from "express";
import { reviewController } from "./review.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = Router();
router.post("/", auth(UserRole.customer), reviewController.createReview);

export const reviewRouter = router;
