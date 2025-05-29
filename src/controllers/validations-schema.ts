import { z } from "zod";

export const validationUserSchema = z.object({
  name: z.string(),
  email: z.string(),
});

export const validationMealsSchema = z.object({
  name: z.string(),
  description: z.string(),
});

export const validationParams = z.object({
  id: z.string(),
});
