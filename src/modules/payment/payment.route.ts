// payment.route.ts
import express from "express";
import { PaymentController } from "./payment.controller";

const router = express.Router();

// Webhook route
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  PaymentController.handleStripeWebhook,
);

export const PaymentRoutes = router;
