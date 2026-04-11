// src/modules/review/review.controller.ts
import { Request, Response } from "express";
import { reviewService } from "./review.service";

const createReview = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const result = await reviewService.createReview(userId, req.body);
    res
      .status(201)
      .json({ success: true, message: "Review added!", data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const reviewController = { createReview };
