import { Category } from "../../generated/prisma/client";
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
  const existingMeals = await prisma.meal.findFirst({
    where: { categoryId: id },
  });

  if (existingMeals) {
    throw new Error("There have meals under this category inside the DB!!");
  }

  const result = await prisma.category.delete({
    where: { id },
  });

  return result;
};

export const categoryService = {
  createCategory,
  getAllCategory,
  deleteCategory,
  //   getProviderById,
};
