import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { getAuthRedirect } from "./lib/validations/auth";

export default auth(req => {
  const isLoggedIn = !!req.auth?.user;
  const pathname = req.nextUrl.pathname;
  // const acceptLanguageHeader = req.headers.get(ACCEPT_LANGUAGE_HEADER)

  const redirectResponse = getAuthRedirect({ isLoggedIn, pathname });

  if (redirectResponse.shouldRedirect) {
    const newUrl = new URL(redirectResponse.redirectTo, req.url);
    return NextResponse.redirect(newUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
