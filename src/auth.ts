import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { getUser } from "./app/lib/actions";
import { PrismaClient } from "@prisma/client";
import { CredentialsSchema } from "./app/zod/schema";

const prisma = new PrismaClient();

export const authConfig = {
  debug: process.env.NODE_ENV === "production" ? false : true,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object(CredentialsSchema)
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email, password);
          if (user) {
            return { user, id: String(user.id) };
          }
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async signIn({ user, account }) {
      const { email, name } = user;
      if (!email) return false;
      if (account?.provider === "google") {
        let dbUser = await prisma.user.findUnique({ where: { email } });
        if (!dbUser) {
          dbUser = await prisma.user.create({
            data: { email, name: name ?? "Google User" },
          });
        }
        return true;
      } else if (account?.provider === "credentials") {
        return true;
      }
      return false;
    },
    session({ session, token }) {
      return {
        ...session,
        user: { ...session.user, id: token.sub },
      };
    },
  },
} satisfies NextAuthConfig;

export const { auth, handlers, signIn, signOut } = NextAuth(authConfig);
