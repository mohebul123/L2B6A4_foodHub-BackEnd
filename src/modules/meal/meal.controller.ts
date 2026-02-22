import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import { mealService } from "./meal.service";

const getAllMeal = async (req: Request, res: Response) => {
  try {
    const result = await mealService.getAllMeal;

    return res.status(200).json({
      success: true,
      message: "Meals retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getMealById = async (req: Request, res: Response) => {
  const id = req.params.mealId;
  try {
    const result = await mealService.getMealById(id as string);
    res.status(200).json({
      success: true,
      message: "Meal retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const mealController = {
  getAllMeal,
  getMealById,
};
