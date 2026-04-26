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
      ),
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
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    price: z.number().positive("Price must be a positive number"),
    categoryId: z.string().min(1, "Category ID is required"),
    image: z.string().url("Invalid image URL").optional().or(z.literal("")),
    isAvailable: z.boolean().optional().default(true), // Eita add koro
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
