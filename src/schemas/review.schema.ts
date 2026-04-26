import { z } from "zod";

export const createReviewSchema = z.object({
  body: z.object({
    rating: z
      .number({
        error: "Rating is required",
      })
      .int()
      .min(1, "Rating must be at least 1")
      .max(5, "Rating cannot be more than 5"),
    comment: z
      .string()
      .max(500, "Comment cannot exceed 500 characters")
      .optional(),
    mealId: z
      .string({
        error: "Meal ID is required",
      })
      .uuid("Invalid Meal ID format"),
  }),
});
