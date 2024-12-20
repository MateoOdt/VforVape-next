import * as z from "zod";

export const connectionSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address"),
  password: z
    .string()
    .min(2, "Password must be at least 8 characters")
    .max(100, "Password must be less than 100 characters"),
});