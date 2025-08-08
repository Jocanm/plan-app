import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { ROUTES } from "./constants/routes";

const publicPath = "/auth";

export default auth((req) => {
  const isLoggedIn = req.auth?.user;
  const isPublicRoute = req.nextUrl.pathname.startsWith(publicPath);

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL(ROUTES.LOGIN, req.url));
  }

  if (isLoggedIn && isPublicRoute) {
    return NextResponse.redirect(new URL(ROUTES.HOME, req.url));
  }

  return NextResponse.next();
})

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};