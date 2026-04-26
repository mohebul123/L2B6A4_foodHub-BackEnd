import { Router } from "express";
import { orderController } from "./order.controller";
import auth, { UserRole } from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { createOrderSchema } from "../../schemas/order.schema";

const router = Router();

router.post(
  "/",
  validateRequest(createOrderSchema),
  auth(UserRole.customer),
  orderController.createOrder,
);
router.get("/", auth(UserRole.customer), orderController.getOrders);
router.get("/allOrders", auth(UserRole.admin), orderController.getAllOrders);
router.get(
  "/provider-orders",
  auth(UserRole.provider),
  orderController.getProviderOrdersFromDB,
);
router.get("/:orderID", auth(UserRole.customer), orderController.getOrderById);

export const orderRouter = router;
