import { z } from "zod";

export const createProviderProfileSchema = z.object({
  body: z.object({
    restaurantName: z
      .string()
      .min(1, "Restaurant name is required")
      .max(100, "Name is too long"),
    description: z
      .string()
      .max(500, "Description cannot exceed 500 characters")
      .optional(),
    address: z.string().min(1, "Address is required"),
    phone: z
      .string()
      .min(1, "Phone number is required")
      .regex(
        /^(?:\+88|88)?(01[3-9]\d{8})$/,
        "Invalid Bangladeshi phone number",
      ), // Optional: BD phone validation
    userId: z.string().min(1, "User ID is required"),
  }),
});

export const updateProviderProfileSchema = z.object({
  body: z.object({
    restaurantName: z.string().optional(),
    description: z.string().optional(),
    address: z.string().optional(),
    phone: z.string().optional(),
  }),
});

export const createMealSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(1, "Meal title is required")
      .max(100, "Title is too long"),
    description: z
      .string()
      .min(10, "Description should be at least 10 characters long"),
    price: z
      .number({
        error: "Price is required",
      })
      .positive("Price must be greater than 0"),
    image: z.string().url("Invalid image URL").optional(),
    isAvailable: z.boolean().default(true).optional(),
    providerId: z.string().min(1, "Provider ID is required"),
    categoryId: z.string().min(1, "Category ID is required"),
  }),
});

export const updateMealSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    price: z.number().positive().optional(),
    image: z.string().url().optional(),
    isAvailable: z.boolean().optional(),
    categoryId: z.string().optional(),
  }),
});
