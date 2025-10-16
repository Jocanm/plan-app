import { getTranslations } from "next-intl/server";

export const getLoginError = async (error: string | string[] | undefined) => {
  const t = await getTranslations("error.errors");

  const errorKey =
    error === "OAuthAccountNotLinked" ? "oauth_account_not_linked" : "default";

  return {
    title: t(`${errorKey}.title`),
    message: t(`${errorKey}.message`),
  };
};
