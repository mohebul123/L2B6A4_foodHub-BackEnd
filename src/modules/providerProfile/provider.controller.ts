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
const createProviderProfile = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  try {
    const result = await providerService.createProviderProfile(
      req.body,
      userId,
    );
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

const getOwnProviderProfile = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  try {
    const result = await providerService.getOwnProviderProfile(userId);
    res.status(200).json({
      success: true,
      message: " Provider retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateOwnProviderProfile = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  console.log("from controller", userId);
  try {
    const result = await providerService.updateOwnProviderProfile(
      req.body,
      userId,
    );

    return res.status(200).json({
      success: true,
      message: "Provider Profile updated successfully",
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
    const result = await providerService.getAllProvider();

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
  const { providerId } = req.params; // Router-er variable name match koraite hobe
  try {
    const result = await providerService.getProviderById(providerId as string);
    res.status(200).json({
      success: true,
      message: "Provider retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const updateMealbyId = async (req: Request, res: Response) => {
  const { mealId } = req.params;
  const userId = (req as any).user?.id; // Casting for TS

  try {
    const result = await providerService.updateMealbyId(
      req.body,
      mealId as string,
      userId,
    );
    return res.status(200).json({
      success: true,
      message: "Meal updated successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const providerController = {
  createMeal,
  createProviderProfile,
  getOwnProviderProfile,
  updateOwnProviderProfile,
  getAllProvider,
  getProviderById,
  updateMealbyId,
};
