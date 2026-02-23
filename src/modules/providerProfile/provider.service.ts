import { JwtPayload } from "jsonwebtoken";
import { Meal, ProviderProfile } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

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
