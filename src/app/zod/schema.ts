import { z } from "zod";

export const RegisterSchema = {
  name: z
    .string({ message: "Name is required" })
    .min(3, { message: "Name must be at least 3 characters" }),
  email: z.string({ message: "Email must be a valid email" }).email(),
  password: z.string({ message: "Password is required" }).min(6, {
    message: "Password is required and must be at least 6 characters",
  }),
};

export const CredentialsSchema = {
  email: z.string().email(),
  password: z.string().min(6),
};

export const productSchema = z.object({
  name: z.string(),
  description: z.string(),
  images: z.string(),
  videos: z.string(),
  price: z.number(),
  category: z.string(),
});

export const getProductSchema = z.object({
  id: z.number(),
});

export const updateProductSchema = productSchema.extend({
  id: z.number(),
});

export const archiveProductSchema = z.object({
  id: z.number(),
});

export const deleteProductSchema = z.object({
  id: z.number(),
});
