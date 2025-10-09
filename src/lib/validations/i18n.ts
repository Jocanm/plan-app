import { Locale } from "next-intl";
import { locales } from "../constants/locale";

export function isLocaleValid(locale: string[]): locale is Locale[];
export function isLocaleValid(locale: string): locale is Locale;
export function isLocaleValid(locale: string | string[]): boolean {
  if (Array.isArray(locale)) {
    return locale.every(el => locales.includes(el as Locale));
  }

  return locales.includes(locale as Locale);
}
