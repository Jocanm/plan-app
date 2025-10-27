import { defineRouting } from "next-intl/routing";
import { DEFAULT_LOCALE, locales } from "../features/i18n/domain/constants";

export const routing = defineRouting({
  locales: locales,
  localeCookie: false,
  localePrefix: "always",
  defaultLocale: DEFAULT_LOCALE,
});
