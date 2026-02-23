import { JwtPayload } from "jsonwebtoken";
import { Meal, ProviderProfile } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createMeal = async (payload: Meal) => {
  console.log(payload);
  const isExist = await prisma.meal.findUnique({
    where: {
      id: payload.id,
    },
  });
  if (isExist) {
    throw new Error("Meal Already Exists in db");
  }
  const result = await prisma.meal.create({
    data: payload,
  });
  return result;
};

const createProvider = async (payload: ProviderProfile, userId: string) => {
  console.log(userId);
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

export const providerService = {
  createMeal,
  createProvider,
  getAllProvider,
  getProviderById,
};
