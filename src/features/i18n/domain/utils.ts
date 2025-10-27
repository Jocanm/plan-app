import { parseHeadersList } from "@/shared/utils/headers";
import { isLocaleValid } from "./validations";

export const normalizeLocale = (locale: string) => {
  const baseLocale = locale.split("-")[0] ?? "";
  const lowerCaseLocale = baseLocale.toLowerCase();

  return lowerCaseLocale;
};

export const getPrimaryLanguage = (
  header: string | null | undefined,
  supportedLocales: readonly string[]
): string | undefined => {
  const locales = parseHeadersList(header);
  const normalizedLocales = locales.map(normalizeLocale);

  return normalizedLocales.find(locale => {
    return isLocaleValid(locale, supportedLocales);
  });
};

export const buildLocalizedRoute = (route: string, locale: string): string => {
  return `/${locale}${route}`;
};
