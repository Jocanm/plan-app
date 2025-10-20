export const getLoginError = (error: string | string[] | undefined) => {
  const errorKey =
    error === "OAuthAccountNotLinked" ? "oauth_account_not_linked" : "default";

  return {
    titleKey: `${errorKey}.title` as const,
    messageKey: `${errorKey}.message` as const,
  };
};
