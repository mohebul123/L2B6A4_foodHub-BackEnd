import { z } from "zod";

export const createOrderSchema = z.object({
  body: z.object({
    deliveryAddress: z.string().min(1, "Delivery address is required"),
    orderItems: z
      .array(
        z.object({
          mealId: z.string().min(1, "Meal ID is required"),
          quantity: z.number().min(1, "Quantity must be at least 1"),
        }),
      )
      .min(1, "At least one item is required"),
  }),
});
