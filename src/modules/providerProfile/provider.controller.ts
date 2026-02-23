import { Request, Response } from "express";
import { providerService } from "./provider.service";

const createMeal = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  try {
    const result = await providerService.createMeal(req.body, userId);
    res.status(201).json({
      success: true,
      message: "Meal created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const createProvider = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  try {
    const result = await providerService.createProvider(req.body, userId);
    res.status(201).json({
      success: true,
      message: "Provider Profile created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllProvider = async (req: Request, res: Response) => {
  try {
    const result = await providerService.getAllProvider;

    return res.status(200).json({
      success: true,
      message: "All Provider retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getProviderById = async (req: Request, res: Response) => {
  const id = req.params.mealId;
  try {
    const result = await providerService.getProviderById(id as string);
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

export const providerController = {
  createMeal,
  createProvider,
  getAllProvider,
  getProviderById,
};
