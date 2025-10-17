import { Locale } from "next-intl";
import { locales } from "./constants";

export function isLocaleValid(
  locale: string[],
  supportedLocales?: readonly string[]
): locale is Locale[];
export function isLocaleValid(
  locale: string,
  supportedLocales?: readonly string[]
): locale is Locale;
export function isLocaleValid(
  locale: string | string[],
  supportedLocales: readonly string[] = locales
): boolean {
  if (Array.isArray(locale)) {
    return locale.every(el => supportedLocales.includes(el as Locale));
  }

  return supportedLocales.includes(locale as Locale);
}
