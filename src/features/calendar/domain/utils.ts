import { format } from "date-fns";
import { enUS, es } from "date-fns/locale";
import { MIN_CALENDAR_EVENT_DURATION_MINUTES } from "./constants";

const locales = { en: enUS, es };

type Locale = keyof typeof locales;

export const toCalendarDateISO = (date: Date): string => {
  const dateString = format(date, "yyyy-MM-dd");

  return `${dateString}T00:00:00.000Z`;
};

export type FormatEventTimeOptions = {
  start: Date;
  end: Date;
  locale?: string;
  short?: boolean;
};

export const formatEventTime = ({
  start,
  end,
  locale = "en",
  short = false,
}: FormatEventTimeOptions): string => {
  const dateLocale = locales[locale as Locale] ?? locales.en;
  const timeFormat = "h:mm a";

  if (short) {
    return format(start, timeFormat, { locale: dateLocale });
  }

  const startTime = format(start, timeFormat, { locale: dateLocale });
  const endTime = format(end, timeFormat, { locale: dateLocale });

  return `${startTime} - ${endTime}`;
};

export const getEventDurationMinutes = (start: Date, end: Date): number => {
  return Math.round((end.getTime() - start.getTime()) / (1000 * 60));
};

export const isShortEvent = (start: Date, end: Date): boolean => {
  return (
    getEventDurationMinutes(start, end) < MIN_CALENDAR_EVENT_DURATION_MINUTES
  );
};
