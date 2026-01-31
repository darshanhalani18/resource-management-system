import { z } from "zod";

export const RegisterSchema = z
  .object({
    orgName: z.string().min(2, "Organization name is too short"),
    orgEmail: z.string().email("Invalid organization email"),
    orgType: z.string().min(1, "Please select an organization type"),
    country: z.string().min(1, "Country is required"),
    state: z.string().optional(),
    city: z.string().optional(),
    address: z.string().optional(),

    adminName: z.string().min(2, "Full name is required"),
    email: z.string().email("Invalid admin email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
