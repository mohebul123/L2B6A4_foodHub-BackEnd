import { JwtPayload } from "jsonwebtoken";
import {
  Meal,
  OrderStatus,
  ProviderProfile,
} from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { MealScalarFieldEnum } from "../../generated/prisma/internal/prismaNamespace";

const createMeal = async (payload: Meal, userId: string) => {
  const provider = await prisma.providerProfile.findUnique({
    where: {
      userId,
    },
  });
  if (!provider) {
    throw new Error("ProviderProfile Not Found in  DB");
  }
  const isCategoryExist = await prisma.category.findUnique({
    where: {
      id: payload.categoryId,
    },
  });

  if (!isCategoryExist) {
    throw new Error("Category Not Found in  DB");
  }
  const result = await prisma.meal.create({
    data: { ...payload, providerId: provider.id },
  });
  return result;
};

const createProviderProfile = async (
  payload: ProviderProfile,
  userId: string,
) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    throw new Error("Invalid user");
  }
  const result = await prisma.providerProfile.create({
    data: { ...payload, userId },
  });
  return result;
};

const getOwnProviderProfile = async (userId: string) => {
  const result = await prisma.providerProfile.findUnique({
    where: {
      userId,
    },
    include: {
      user: true,
    },
  });
  if (!result) {
    throw new Error("No Provider Found");
  }

  return result;
};
const updateOwnProviderProfile = async (
  payload: Partial<ProviderProfile>,
  userId: string,
) => {
  const profile = await prisma.providerProfile.findUnique({
    where: {
      userId,
    },
  });

  if (!profile) {
    throw new Error("No Provider Found");
  }
  if (!(userId === profile.userId)) {
    console.log("you are not authorized to update");
  }
  const result = await prisma.providerProfile.update({
    where: {
      id: profile.id,
    },
    data: payload,
  });
  return result;
};
const getAllProvider = async () => {
  const result = await prisma.providerProfile.findMany();
  if (!result) {
    throw new Error("No Provider Found!!");
  }
  return result;
};
const getProviderById = async (id: string) => {
  const result = await prisma.providerProfile.findUnique({
    where: {
      id,
    },
    include: {
      meals: true,
    },
  });
  if (!result) {
    throw new Error("Provider not found");
  }
  return result;
};

const updateMealbyId = async (
  updateDetails: Partial<Meal>,
  mealId: string,
  userId: string,
) => {
  const profile = await prisma.providerProfile.findUnique({
    where: { userId },
  });

  if (!profile) throw new Error("Provider profile not found!");

  const meal = await prisma.meal.findUnique({
    where: { id: mealId },
  });

  if (!meal) throw new Error("Meal not found!");

  // 🔥 CRITICAL SECURITY CHECK: Check if this meal belongs to this provider
  if (meal.providerId !== profile.id) {
    throw new Error("You are not authorized to update this meal!");
  }

  const result = await prisma.meal.update({
    where: { id: mealId },
    data: updateDetails,
  });

  return result;
};

// Add this to provider.service.ts
const updateOrderStatus = async (
  orderId: string,
  status: OrderStatus,
  providerId: string,
) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { orderItems: { include: { meal: true } } },
  });

  if (!order) throw new Error("Order not found");

  const isOwner = order.orderItems.some(
    (item) => item.meal.providerId === providerId,
  );

  if (!isOwner) {
    throw new Error("You are not authorized to update this order!");
  }
  const result = await prisma.order.update({
    where: { id: orderId },
    data: { status },
  });

  return result;
};
export const providerService = {
  createMeal,
  createProviderProfile,
  getOwnProviderProfile,
  updateOwnProviderProfile,
  getAllProvider,
  getProviderById,
  updateMealbyId,
  updateOrderStatus,
};
