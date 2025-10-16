import { isLocaleValid } from "../validations/i18n";
import { parseHeadersList } from "./headers";

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
