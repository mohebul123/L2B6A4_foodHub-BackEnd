import { Router } from "express";
import { reviewController } from "./review.controller";
import auth, { UserRole } from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { createReviewSchema } from "../../schemas/review.schema";

const router = Router();
router.post(
  "/",
  auth(UserRole.customer),
  validateRequest(createReviewSchema),
  reviewController.createReview,
);

export const reviewRouter = router;
