import { RequestHandler } from "express";
import { authService } from "./auth.service";
import sendResponse from "../../utils/sendRes";
import { JwtPayload } from "jsonwebtoken";

const register: RequestHandler = async (req, res) => {
  const payload = req.body;

  try {
    const result = await authService.register(payload);

    res.status(201).json({
      success: true,
      message: "User Registerd successfully",
      data: result,
    });
  } catch (error) {
    console.error("Something went wrong: ", error);
  }
};
const login: RequestHandler = async (req, res) => {
  const payload = req.body;
  try {
    const result = await authService.login(payload);
    res.cookie("token", result.token, {
      secure: false,
      httpOnly: true,
      sameSite: "strict", // none / strict / lax
    });
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User Logged in sucessfully",
      data: result,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: "Something went wrong",
      data: error,
    });
  }
};

const getCurrentUser: RequestHandler = async (req, res) => {
  try {
    const result = req.user;
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Current USer information retrive sucessfully",
      data: result as JwtPayload,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: "Something went wrong",
      data: error,
    });
  }
};
export const authController = {
  register,
  login,
  getCurrentUser,
};
