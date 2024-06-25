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

export interface FieldFileType {
  documnetId: string;
  file: File;
}

export const zodKeys = <T extends z.ZodTypeAny>(schema: T): string[] => {
  // make sure schema is not null or undefined
  if (schema === null || schema === undefined) return [];
  // check if schema is nullable or optional
  if (schema instanceof z.ZodNullable || schema instanceof z.ZodOptional)
    return zodKeys(schema.unwrap());
  // check if schema is an array
  if (schema instanceof z.ZodArray) return zodKeys(schema.element);
  // check if schema is an object
  if (schema instanceof z.ZodObject) {
    // get key/value pairs from schema
    const entries = Object.entries(schema.shape);
    // loop through key/value pairs
    return entries.flatMap(([key, value]) => {
      // get nested keys
      const nested =
        value instanceof z.ZodType
          ? zodKeys(value).map((subKey) => `${key}.${subKey}`)
          : [];
      // return nested keys
      return nested.length ? nested : key;
    });
  }
  // return empty array
  return [];
};

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const MAX_FILE_SIZE = 5000000;

const validateFileSize = (files: FieldFileType[]) => {
  const err = files?.map((file) => {
    return file.file.size <= MAX_FILE_SIZE;
  });
  return !err?.includes(false);
};

const validateFileType = (files: FieldFileType[]) => {
  const err = files?.map((file) => {
    return ACCEPTED_IMAGE_TYPES.includes(file.file.type);
  });
  return !err?.includes(false);
};

export const productSchema = z.object({
  name: z
    .string({
      message: "Product Name must be filled.",
    })
    .min(3, {
      message: "Product Name must be at least 3 characters.",
    }),
  description: z.string(),
  images: z
    .custom<FieldFileType[]>()
    .refine(validateFileSize, `Max image size is 5MB.`)
    .refine(
      validateFileType,
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    )
    .transform((value) => value.map((v) => v.file)),
  videos: z.string(),
  price: z.coerce
    .number({
      message: "Product Price must be filled.",
    })
    .min(1, {
      message: "Product Price should be valid.",
    })
    .transform((value) => Number(value)),
  category: z.string().min(3, {
    message: "Category must be at least 3 characters.",
  }),
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
