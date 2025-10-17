export const AUTH_PATH = "/auth";

export const ROUTES = {
  HOME: "/",
  DESIGN_SYSTEM: "/design-system",
  LOGIN: `${AUTH_PATH}/login`,
  ERROR: `${AUTH_PATH}/error`,
  API_LOGIN: "/api/auth/signin",
} as const;
