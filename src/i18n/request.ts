import { hasLocale } from "next-intl";
import { getRequestConfig, RequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const config: RequestConfig = {
    locale: locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };

  return config;
});
