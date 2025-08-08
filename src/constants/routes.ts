export const AUTH_PATH = "/auth";

export const ROUTES = {
  HOME: '/',
  LOGIN: `${AUTH_PATH}/login`,
  ERROR: `${AUTH_PATH}/error`,
} as const;