import { JwtPayload } from "jsonwebtoken";
import { Category, Meal, ProviderProfile } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createCategory = async (payload: Category) => {
  const category = await prisma.category.findUnique({
    where: {
      name: payload.name,
    },
  });
  if (category) {
    throw new Error("Category Already exist in DB");
  }
  const result = await prisma.category.create({
    data: payload,
  });
  return result;
};

const getAllCategory = async () => {
  const result = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      meals: {
        select: {
          title: true,
        },
      },
    },
  });

  if (!result) {
    throw new Error("No Provider Found!!");
  }
  return result;
};

export const deleteCategory = async (id: string) => {
  // 1. Check koro kono meal ei category-te ache kina
  const existingMeals = await prisma.meal.findFirst({
    where: { categoryId: id },
  });

  if (existingMeals) {
    // return na kore throw koro, jate Catch block e jay
    throw new Error("There have meals under this category inside the DB!!");
  }

  // 2. Jodi meal na thake, tobe delete koro
  const result = await prisma.category.delete({
    where: { id },
  });

  return result; // Database object return korbe
};

export const categoryService = {
  createCategory,
  getAllCategory,
  deleteCategory,
  //   getProviderById,
};
