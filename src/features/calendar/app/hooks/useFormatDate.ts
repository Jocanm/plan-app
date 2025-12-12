import { format, Locale } from "date-fns";
import { enUS, es } from "date-fns/locale";
import { useLocale } from "next-intl";
import { useCallback } from "react";

export const dateFnsLocales = { en: enUS, es };

interface FormatDateProps {
  date: Date;
  formatStr: string;
  locale?: Locale;
}

export const useFormatDate = () => {
  const locale = useLocale();
  const dateLocale = dateFnsLocales[locale] ?? enUS;

  const formatDate = useCallback(
    ({ date, formatStr, locale: customLocale }: FormatDateProps) => {
      return format(date, formatStr, { locale: customLocale ?? dateLocale });
    },
    [dateLocale]
  );

  return { format: formatDate };
};
