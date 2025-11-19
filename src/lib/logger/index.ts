import pino from "pino";

const devOptions = {
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "SYS:HH:MM:ss",
      ignore: "pid,hostname",
    },
  },
};

export const logger = pino({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  ...(process.env.NODE_ENV !== "production" && { ...devOptions }),
  base: {
    env: process.env.NODE_ENV,
  },
  redact: {
    paths: [
      "password",
      "token",
      "credentials",
      "input.password",
      "input.token",
      "input.credentials",
      "authorization",
      "cookie",
      "sessionId",
    ],
    censor: "[REDACTED]",
  },
});
