import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { env } from "./env";
import {
  ACCEPT_LANGUAGE_HEADER,
  LOCALE_COOKIE_KEY,
  locales,
} from "./lib/constants/locale";
import { getPrimaryLanguage } from "./lib/utils/i18n";
import { getAuthRedirect } from "./lib/validations/auth";

const LOCALE_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

export default auth(req => {
  let localeToSet: string | undefined;
  const cookieLocale = req.cookies.get(LOCALE_COOKIE_KEY)?.value;

  if (!cookieLocale) {
    const acceptLanguageHeader = req.headers.get(ACCEPT_LANGUAGE_HEADER);
    localeToSet = getPrimaryLanguage(acceptLanguageHeader, locales);
  }

  const isLoggedIn = !!req.auth?.user;
  const pathname = req.nextUrl.pathname;
  const redirectResponse = getAuthRedirect({ isLoggedIn, pathname });

  const response = redirectResponse.shouldRedirect
    ? NextResponse.redirect(new URL(redirectResponse.redirectTo, req.url))
    : NextResponse.next();

  if (localeToSet) {
    response.cookies.set(LOCALE_COOKIE_KEY, localeToSet, {
      path: "/",
      sameSite: "lax",
      httpOnly: false,
      maxAge: LOCALE_COOKIE_MAX_AGE_SECONDS,
      secure: env.NODE_ENV === "production",
    });
  }

  return response;
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
