import { auth } from "@/auth";
import { type NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboard"];

async function routeCheck(request: NextRequest) {
  const session = await auth();
  if (protectedRoutes.includes(request.nextUrl.pathname) && !session) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }
  return null;
}

const middlewares = [routeCheck, auth];

export default async function middleware(request: NextRequest) {
  // if a response is returned, return it otherwise call `next()`
  for (const fn of middlewares) {
    const response = await fn(request);
    if (response) return response;
  }

  return NextResponse.next();
}

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
