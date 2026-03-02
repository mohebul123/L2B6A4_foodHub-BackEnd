import { Request, Response } from "express";
import { categoryService } from "./category.service";

const createCategory = async (req: Request, res: Response) => {
  try {
    const result = await categoryService.createCategory(req.body);
    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllCategory = async (req: Request, res: Response) => {
  try {
    const result = await categoryService.getAllCategory();

    return res.status(200).json({
      success: true,
      message: "All Category retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// const getProviderById = async (req: Request, res: Response) => {
//   const id = req.params.mealId;
//   try {
//     const result = await providerService.getProviderById(id as string);
//     res.status(200).json({
//       success: true,
//       message: "Meal retrieved successfully",
//       data: result,
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

export const categoryController = {
  createCategory,
  getAllCategory,
};
