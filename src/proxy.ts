import { auth } from "@/lib/auth";
import createIntlMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import {
  getAuthRedirect,
  isPublicRoute,
  removeLocalePrefix,
} from "./features/auth/domain/validations";
import { routing } from "./i18n/routing";
import { QUERY_KEYS } from "./lib/config/constants";

const intlMiddleware = createIntlMiddleware(routing);

export default auth(req => {
  const intlResponse = intlMiddleware(req);

  if (intlResponse.status === 307 || intlResponse.status === 308) {
    return intlResponse;
  }

  const isLoggedIn = !!req.auth?.user;
  const pathname = req.nextUrl.pathname;
  const redirectResponse = getAuthRedirect({ isLoggedIn, pathname });

  if (redirectResponse.shouldRedirect) {
    const isBeingRedirectToPublic = isPublicRoute(redirectResponse.redirectTo);
    const url = new URL(redirectResponse.redirectTo, req.url);

    if (isBeingRedirectToPublic) {
      const pathWithoutLocale = removeLocalePrefix(pathname);
      url.searchParams.set(QUERY_KEYS.from, pathWithoutLocale);
    }

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
