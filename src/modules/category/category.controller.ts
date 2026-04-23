import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../utils/sendRes";
import { categoryService } from "./category.service";

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryService.createCategory(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Category created successfully!",
    data: result,
  });
});

const getAllCategories = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryService.getAllCategory();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Categories fetched successfully!",
    data: result,
  });
});

const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await categoryService.deleteCategory(id as string);

    // Service jodi error na khai, tobei eikhane ashbe
    res.status(200).json({
      success: true,
      message: "Category deleted successfully!",
      data: result,
    });
  } catch (error: any) {
    // Service e "throw new Error" hole eikhane ashbe
    res.status(400).json({
      success: false,
      message: error.message || "Failed to delete category",
    });
  }
};

export const CategoryController = {
  createCategory,
  getAllCategories,
  deleteCategory,
};
