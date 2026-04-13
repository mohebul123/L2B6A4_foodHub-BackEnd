import { Router } from "express";
import { orderController } from "./order.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = Router();

router.post("/", auth(UserRole.customer), orderController.createOrder);
router.get("/", auth(UserRole.customer), orderController.getOrders);
router.get(
  "/provider-orders",
  auth(UserRole.provider),
  orderController.getProviderOrdersFromDB,
);
router.get("/:orderID", auth(UserRole.customer), orderController.getOrderById);

export const orderRouter = router;
