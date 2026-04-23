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

export const userController = {
  getAllUser,
};
