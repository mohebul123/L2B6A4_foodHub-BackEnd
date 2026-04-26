import { NextFunction, Response, Request } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../utils/sendRes";
import { userService } from "./user.service";

const getAllUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await userService.getAllUser();
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Users retrive successfully",
      data: result,
    });
  },
);

const updateMyProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const updateData = req.body;

    const result = await userService.updateProfile(userId, updateData);

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

export const userController = {
  getAllUser,
  updateMyProfile,
};
