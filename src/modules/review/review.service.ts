// src/modules/review/review.service.ts
import { prisma } from "../../lib/prisma";

const createReview = async (
  userId: string,
  payload: { mealId: string; rating: number; comment?: string },
) => {
  // Check if the meal exists
  const meal = await prisma.meal.findUnique({ where: { id: payload.mealId } });
  if (!meal) throw new Error("Meal not found");

  const result = await prisma.review.create({
    data: {
      ...payload,
      userId,
    },
  });
  return result;
};

const getReviewsForMeal = async (mealId: string) => {
  return await prisma.review.findMany({
    where: { mealId },
    include: { user: { select: { name: true } } },
  });
};

export const reviewService = { createReview, getReviewsForMeal };
