import { loginErrorMessages } from "@/constants/login-error";

type ErrorKey = keyof typeof loginErrorMessages;

export const getLoginError = (error: string | string[] | undefined) => {
  const { title, message } =
    error && loginErrorMessages[error as ErrorKey]
      ? loginErrorMessages[error as ErrorKey]
      : loginErrorMessages.Default;

  return { title, message };
}