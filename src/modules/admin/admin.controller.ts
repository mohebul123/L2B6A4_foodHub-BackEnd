import { Request, Response } from "express";
import { adminService } from "./admin.service";
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await adminService.getAllUsers();
    return res.status(200).json({
      success: true,
      message: "All User retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateUserStatus = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { status } = req.body; // Frontend theke status (ACTIVE/SUSPENDED) pathabe

    const result = await adminService.updateUserStatus(
      userId as string,
      status,
    );

    return res.status(200).json({
      success: true,
      message: "User status updated successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const adminController = {
  getAllUsers,
  updateUserStatus,
};
