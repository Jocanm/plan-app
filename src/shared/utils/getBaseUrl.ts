import { env } from "../../lib/env";

export const getBaseUrl = () => {
  const baseUrl = env.VERCEL_URL
    ? `https://${env.VERCEL_URL}`
    : "http://localhost:3000";

  return baseUrl;
};
