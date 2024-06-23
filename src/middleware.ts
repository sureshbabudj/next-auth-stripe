import { auth } from "@/auth";
import { type NextRequest, NextResponse } from "next/server";

function routeCheck(request: NextRequest) {
  console.log("Request path:", request.nextUrl.pathname);
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
