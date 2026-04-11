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

const getOrders = async (req: Request, res: Response) => {
  try {
    const customerId = req.user?.id;
    const result = await orderService.getOrders(customerId);
    res.status(201).json({
      success: true,
      message: "Orders Retrived Successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getOrderById = async (req: Request, res: Response) => {
  try {
    const { orderID } = req.params; // Route param match koraite hobe
    const result = await orderService.getOrderById(orderID as string); // Service name correct koro

    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res.status(200).json({
      success: true,
      message: "Order Retrieved Successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const orderController = {
  createOrder,
  getOrders,
  getOrderById,
};
