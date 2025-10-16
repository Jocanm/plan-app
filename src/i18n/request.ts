import { getRequestConfig, RequestConfig } from "next-intl/server";
import { cookies } from "next/headers";
import { isLocaleValid } from "../lib/validations/i18n";

const LOCALE_COOKIE_KEY = "locale";
const DEFAULT_LOCALE = "en";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();

  const cookieLocale =
    cookieStore.get(LOCALE_COOKIE_KEY)?.value ?? DEFAULT_LOCALE;
  const validLocale = isLocaleValid(cookieLocale)
    ? cookieLocale
    : DEFAULT_LOCALE;

  const config: RequestConfig = {
    locale: validLocale,
    messages: (await import(`../../messages/${validLocale}.json`)).default,
  };

  return config;
});
