import { NextFunction, RequestHandler } from "express";
import { authService } from "./auth.service";
import sendResponse from "../../utils/sendRes";
import { JwtPayload } from "jsonwebtoken";
import catchAsync from "../../shared/catchAsync";

const register: RequestHandler = catchAsync(async (req, res, next) => {
  const payload = req.body;
  const result = await authService.register(payload);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User Registerd successfully",
    data: result,
  });
});

const login: RequestHandler = catchAsync(async (req, res, next) => {
  const payload = req.body;
  const result = await authService.login(payload);
  res.cookie("token", result.token, {
    secure: false,
    httpOnly: true,
    sameSite: "strict",
  });
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User Logged in sucessfully",
    data: result,
  });
});

const getCurrentUser: RequestHandler = async (req, res, next) => {
  try {
    const result = req.user;
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Current USer information retrive sucessfully",
      data: result as JwtPayload,
    });
  } catch (error) {
    next(error);
  }
};
export const authController = {
  register,
  login,
  getCurrentUser,
};
