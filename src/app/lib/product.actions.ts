"use server";

import { PrismaClient, Product, User } from "@prisma/client";
import {
  FieldFileType,
  archiveProductSchema,
  deleteProductSchema,
  getProductSchema,
  productSchema,
  updateProductSchema,
  zodKeys,
} from "../zod/schema";
import { SafeParseError } from "zod";
import { auth } from "@/auth";
import { promises as fs } from "fs";
import { join } from "path";
import { writeFile } from "fs/promises";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();

function handleZodErrors(
  result: SafeParseError<{
    id: number;
    name: string;
    description: string;
    images: FieldFileType[];
    videos: string;
    price: number;
    category: string;
  }>
) {
  return result.error.errors.map((e) => e.message).join(", ");
}

async function getCurrentUser(): Promise<Omit<User, "password">> {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    throw { err: "no user found" };
  }

  return { ...user, id: Number(user.id) };
}

export async function getProduct(payload: unknown): Promise<{
  err?: string;
  product?: Product;
}> {
  try {
    const result = getProductSchema.safeParse(payload);

    if (!result.success) {
      return { err: handleZodErrors(result) };
    }

    const product = await prisma.product.findUnique({
      where: { id: result.data.id },
    });

    if (!product) {
      return { err: "no product found" };
    }

    return { product };
  } catch (error) {
    if (error instanceof Error) {
      return { err: error.message };
    } else {
      return { err: "Something went wrong" };
    }
  }
}

export interface GetUserProductsPayload {
  page?: number;
  limit?: number;
  asc?: boolean;
  sortBy?: string;
}

export async function getUserProducts({
  page = 1,
  limit = 10,
  asc,
  sortBy,
}: GetUserProductsPayload): Promise<{
  err?: string;
  products: Product[];
  totalProducts: number;
}> {
  try {
    const user = await getCurrentUser();

    const totalProducts = await prisma.product.count({
      where: { userId: user.id },
    });

    const products = await prisma.product.findMany({
      where: { userId: user.id },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: sortBy ? { [sortBy]: asc ? "asc" : "desc" } : undefined,
    });

    return { products, totalProducts };
  } catch (error) {
    const defautReturnParams = { products: [], totalProducts: 0 };
    if (error instanceof Error) {
      return { err: error.message, ...defautReturnParams };
    } else {
      return { err: "Something went wrong", ...defautReturnParams };
    }
  }
}

async function grabFile(file: File) {
  if (!file) throw new Error("No file uploaded");

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const dest = "./public/uploads";
  const fileName = `${randomUUID()}.${file.name.split(".")[1]}`;
  const dirPath = join(process.cwd(), dest);
  await fs.mkdir(dirPath, { recursive: true });
  const path = join(dest, fileName);
  await writeFile(path, buffer);
  return { success: true, path: `/uploads/${fileName}` };
}

async function grabFiles(images: File[]): Promise<string[]> {
  return Promise.all(images.map(async (i) => (await grabFile(i)).path));
}

export async function createProduct(formData: FormData): Promise<{
  err?: string;
  product?: Product;
}> {
  try {
    const user = await getCurrentUser();

    const payload: { images: File[]; price: string } & Partial<
      Omit<Product, "images" | "price">
    > = {
      name: "",
      images: [],
      description: "",
      price: "",
      videos: "",
      category: "",
    };

    for (let [key, value] of formData.entries()) {
      if (key === "images[]" && value instanceof File) {
        payload.images.push(value);
      } else if (payload.hasOwnProperty(key) && value) {
        // @ts-expect-error
        payload[key] = value;
      }
    }

    if (payload.images.length === 0) {
      return { err: "Images are missing for product" };
    }

    const uploads: string[] = await grabFiles(payload.images);
    const images = uploads.join(",");

    const results = productSchema.safeParse(payload);
    if (results.error) {
      return { err: handleZodErrors(results) };
    }
    const product = await prisma.product.create({
      data: {
        ...results.data!,
        images,
        userId: user.id,
      },
    });
    return { product };
  } catch (error) {
    if (error instanceof Error) {
      return { err: error.message };
    } else {
      return { err: "Something went wrong" };
    }
  }
}

export async function updateProduct(payload: unknown): Promise<{
  err?: string;
  product?: Product;
}> {
  try {
    const user = await getCurrentUser();
    const result = updateProductSchema.safeParse(payload);

    if (!result.success) {
      return { err: handleZodErrors(result) };
    }

    const product = await prisma.product.findUnique({
      where: { id: result.data.id },
    });

    if (!product || product.userId !== user.id || user.name !== "admin") {
      return { err: "You can only update your own products." };
    }

    const updatedProduct = await prisma.product.update({
      where: { id: result.data.id },
      data: { ...result.data, images: JSON.stringify(result.data.images) },
    });

    return { product: updatedProduct };
  } catch (error) {
    if (error instanceof Error) {
      return { err: error.message };
    } else {
      return { err: "Something went wrong" };
    }
  }
}

export async function archiveProduct(payload: unknown): Promise<{
  err?: string;
  product?: Product;
}> {
  try {
    const user = await getCurrentUser();
    const result = archiveProductSchema.safeParse(payload);

    if (!result.success) {
      return { err: handleZodErrors(result) };
    }

    const product = await prisma.product.findUnique({
      where: { id: result.data.id },
    });

    if (!product || product.userId !== user.id || user.name !== "admin") {
      return { err: "You can only archive your own products." };
    }

    const archivedProduct = await prisma.product.update({
      where: { id: result.data.id },
      data: { archived: true },
    });

    return { product: archivedProduct };
  } catch (error) {
    if (error instanceof Error) {
      return { err: error.message };
    } else {
      return { err: "Something went wrong" };
    }
  }
}

export async function deleteProduct(payload: unknown): Promise<{
  err?: string;
  product?: Product;
}> {
  try {
    const user = await getCurrentUser();
    const result = deleteProductSchema.safeParse(payload);

    if (!result.success) {
      return { err: handleZodErrors(result) };
    }

    if (user.name !== "admin") {
      return { err: "Only admins can delete products." };
    }

    const deletedProduct = await prisma.product.delete({
      where: { id: result.data.id },
    });

    return { product: deletedProduct };
  } catch (error) {
    if (error instanceof Error) {
      return { err: error.message };
    } else {
      return { err: "Something went wrong" };
    }
  }
}
