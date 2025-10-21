export const AUTH_PATH = "/auth";
export const DASHBOARD_PATH = "/dashboard";

export const ROUTES = {
  HOME: "/",
  DESIGN_SYSTEM: "/design-system",
  LOGIN: `${AUTH_PATH}/login`,
  ERROR: `${AUTH_PATH}/error`,
  API_LOGIN: "/api/auth/signin",
  DASHBOARD: `${DASHBOARD_PATH}`,
  CALENDAR: `${DASHBOARD_PATH}/calendar`,
  TASKS: `${DASHBOARD_PATH}/tasks`,
} as const;
