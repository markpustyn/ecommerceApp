import { object, string } from "zod";

export const signInSchema = object({
  email: string({ error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),

  password: string({ error: "Password is required" })
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export const signUpSchema = object({
  name: string({ error: "Name is required" })
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),

  email: string({ error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),

  password: string({ error: "Password is required" })
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password must be less than 32 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?]/,
      "Password must contain at least one special character"
    ),

  confirmPassword: string({
    error: "Please confirm your password",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});