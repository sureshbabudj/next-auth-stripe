"use server";
import { PrismaClient } from "@prisma/client";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import bcrypt from "bcrypt-nodejs";
import { z } from "zod";
import { redirect } from "next/navigation";
import { RegisterSchema } from "../zod/schema";

const prisma = new PrismaClient();

export async function signup(formData: FormData) {
  let errMesssage, status;
  try {
    const parsed = z
      .object(RegisterSchema)
      .safeParse(Object.fromEntries(formData));
    if (!parsed.success) throw parsed.error;
    const { name, email, password } = parsed.data;
    const hashedPassword = await bcrypt.hashSync(password);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    status = "ok";
  } catch (error) {
    if (error instanceof z.ZodError) {
      errMesssage = error.errors.map((e) => e.message).join(", ");
    } else {
      errMesssage = (error as any).message ?? "Something went wrong";
    }
    errMesssage = encodeURIComponent(errMesssage);
  }
  if (status === "ok") redirect(`/auth/signin`);
  else redirect(`/auth/register?err=${errMesssage}`);
}

export async function getUser(email: string, password: string) {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw "User not found";
    const isPasswordValid = await bcrypt.compareSync(password, user.password!);
    if (!isPasswordValid) throw "Invalid password";
    return { email: user.email, name: user.name };
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CallbackRouteError":
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function authenticateWithGoogle() {
  await signIn("google");
}

export async function signOutAction() {
  await signOut();
}
