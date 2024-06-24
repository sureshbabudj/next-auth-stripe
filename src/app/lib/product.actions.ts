"use server";

import { PrismaClient, Product, User } from "@prisma/client";
import {
  archiveProductSchema,
  deleteProductSchema,
  getProductSchema,
  productSchema,
  updateProductSchema,
} from "../zod/schema";
import { SafeParseError } from "zod";
import { auth } from "@/auth";

const prisma = new PrismaClient();

function handleZodErrors(result: SafeParseError<any>) {
  return result.error.errors.map((e) => e.message).join(", ");
}

async function getCurrentUser(): Promise<Omit<User, "password">> {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    throw { err: "no user found" };
  }

  return user;
}

export async function getProduct(payload: any): Promise<{
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
      return { err: "nno product found" };
    }

    return { product };
  } catch (error: any) {
    console.log(error);
    return { err: error.message ?? "Something went wrong" };
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
  } catch (error: any) {
    console.log(error);
    return {
      err: error.message ?? "Something went wrong",
      products: [],
      totalProducts: 0,
    };
  }
}

export async function createProduct(payload: any): Promise<{
  err?: string;
  product?: Product;
}> {
  try {
    const user = await getCurrentUser();
    const result = productSchema.safeParse(payload);
    if (!result.success) {
      return { err: handleZodErrors(result) };
    }
    const product = await prisma.product.create({
      data: { ...result.data, userId: user.id },
    });
    return { product };
  } catch (error: any) {
    console.log(error);
    return { err: error.message ?? "Something went wrong" };
  }
}

export async function updateProduct(payload: any): Promise<{
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
      data: result.data,
    });

    return { product: updatedProduct };
  } catch (error: any) {
    console.log(error);
    return { err: error.message ?? "Something went wrong" };
  }
}

export async function archiveProduct(payload: any): Promise<{
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
  } catch (error: any) {
    console.log(error);
    return { err: error.message ?? "Something went wrong" };
  }
}

export async function deleteProduct(payload: any): Promise<{
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
  } catch (error: any) {
    console.log(error);
    return { err: error.message ?? "Something went wrong" };
  }
}
