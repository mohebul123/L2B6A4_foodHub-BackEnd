import { Request, Response } from "express";
import { orderService } from "./order.service";

const createOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const result = await orderService.createOrder(userId, req.body);
    res.status(201).json({
      success: true,
      message: "Order created Successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const orderController = {
  createOrder,
};
