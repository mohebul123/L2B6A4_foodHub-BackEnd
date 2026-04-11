// src/modules/review/review.service.ts
import { prisma } from "../../lib/prisma";

const createReview = async (
  userId: string,
  payload: { mealId: string; rating: number; comment: string },
) => {
  const { mealId, rating, comment } = payload;

  const hasOrdered = await prisma.order.findFirst({
    where: {
      customerId: userId,
      status: "DELIVERED",
      orderItems: {
        some: {
          mealId: mealId,
        },
      },
    },
  });

  if (!hasOrdered) {
    throw new Error(
      "You can only review meals that you have successfully ordered and received.",
    );
  }

  const review = await prisma.review.create({
    data: {
      userId,
      mealId,
      rating,
      comment,
    },
  });

  return review;
};

const getReviewsForMeal = async (mealId: string) => {
  return await prisma.review.findMany({
    where: { mealId },
    include: { user: { select: { name: true } } },
  });
};

export const reviewService = { createReview, getReviewsForMeal };
