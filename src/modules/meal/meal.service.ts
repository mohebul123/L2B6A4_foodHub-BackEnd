import { Meal } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
// interface Imeal {
//   title: string;
//   description: string;
//   price: string;
//   image?: string;
//   isAvailable: true;
//   providerId: string;
//   categoryId: string;
// }

const getAllMeal = async () => {
  const result = await prisma.meal.findMany();
  if (!result) {
    throw new Error("No Meal Found!!");
  }
  return result;
};
const getMealById = async (id: string) => {
  const result = await prisma.meal.findUnique({
    where: {
      id,
    },
  });
  if (!result) {
    throw new Error("Meal not found");
  }
  return result;
};

export const mealService = {
  getAllMeal,
  getMealById,
};
