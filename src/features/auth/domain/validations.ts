import { DEFAULT_LOCALE } from "@/features/i18n/domain/constants";
import { AUTH_PATH, ROUTES } from "@/lib/config/constants";

type RedirectionDecision =
  | { shouldRedirect: false }
  | { shouldRedirect: true; redirectTo: string };

type GetAuthRedirectParams = {
  isLoggedIn: boolean;
  pathname: string;
};

const extractLocale = (pathname: string): string => {
  const localeMatch = pathname.match(/^\/([a-z]{2})(\/|$)/);
  return localeMatch ? localeMatch[1] : DEFAULT_LOCALE;
};

export const removeLocalePrefix = (pathname: string): string => {
  return pathname.replace(/^\/[a-z]{2}(\/|$)/, "/");
};

export const isPublicRoute = (path: string): boolean => {
  const pathWithoutLocale = removeLocalePrefix(path);

  if (!pathWithoutLocale.startsWith(AUTH_PATH)) return false;

  const isExactMatch = pathWithoutLocale === AUTH_PATH;
  const nextChar = pathWithoutLocale[AUTH_PATH.length];
  const isSubPath = nextChar === "/";

  return isExactMatch || isSubPath;
};

export const getAuthRedirect = ({
  isLoggedIn,
  pathname,
}: GetAuthRedirectParams): RedirectionDecision => {
  const locale = extractLocale(pathname);
  const isInPublicRoute = isPublicRoute(pathname);

  if (isInPublicRoute) {
    if (isLoggedIn)
      return {
        shouldRedirect: true,
        redirectTo: `/${locale}${ROUTES.DASHBOARD}`,
      };
    return { shouldRedirect: false };
  }

  // in private route
  if (isLoggedIn) return { shouldRedirect: false };
  return { shouldRedirect: true, redirectTo: `/${locale}${ROUTES.LOGIN}` };
};
