import { prisma } from "../../lib/prisma";

const getAllUsers = async () => {
  const result = await prisma.user.findMany();
  return result;
};

const updateUserStatus = async (
  userId: string,
  status: "ACTIVE" | "SUSPENDED",
) => {
  const result = await prisma.user.update({
    where: { id: userId },
    data: { status },
  });
  return result;
};

const getAdminStats = async () => {
  const totalUsers = await prisma.user.count({
    where: { role: "CUSTOMER" },
  });

  const totalProviders = await prisma.user.count({
    where: { role: "PROVIDER" },
  });

  const totalOrders = await prisma.order.count();

  // Jodi providerProfile separate count korte chao
  const activeRestaurants = await prisma.providerProfile.count();

  return {
    totalUsers,
    totalProviders,
    totalOrders,
    activeRestaurants,
  };
};

export const adminService = {
  getAllUsers,
  updateUserStatus,
  getAdminStats,
};
