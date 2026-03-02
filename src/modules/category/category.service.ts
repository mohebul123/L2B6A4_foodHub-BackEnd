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
// const getCategoryById = async (id: string) => {
//   const result = await prisma.providerProfile.findUnique({
//     where: {
//       id,
//     },
//     include: {
//       meals: true,
//     },
//   });
//   if (!result) {
//     throw new Error("Provider not found");
//   }
//   return result;
// };

export const categoryService = {
  createCategory,
  getAllCategory,
  //   getProviderById,
};
