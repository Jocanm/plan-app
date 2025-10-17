import { AUTH_PATH, ROUTES } from "@/lib/config/constants";

type RedirectionDecision =
  | { shouldRedirect: false }
  | { shouldRedirect: true; redirectTo: string };

type GetAuthRedirectParams = {
  isLoggedIn: boolean;
  pathname: string;
};

export const isPublicRoute = (path: string): boolean => {
  if (!path.startsWith(AUTH_PATH)) return false;

  const isExactMatch = path === AUTH_PATH;
  const nextChar = path[AUTH_PATH.length];
  const isSubPath = nextChar === "/";

  return isExactMatch || isSubPath;
};

export const getAuthRedirect = ({
  isLoggedIn,
  pathname,
}: GetAuthRedirectParams): RedirectionDecision => {
  const isInPublicRoute = isPublicRoute(pathname);

  if (isInPublicRoute) {
    if (isLoggedIn) return { shouldRedirect: true, redirectTo: ROUTES.HOME };
    return { shouldRedirect: false };
  }

  // in private route
  if (isLoggedIn) return { shouldRedirect: false };
  return { shouldRedirect: true, redirectTo: ROUTES.LOGIN };
};
