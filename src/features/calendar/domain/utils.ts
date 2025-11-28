import { format } from "date-fns";

export const toCalendarDateISO = (date: Date): string => {
  const dateString = format(date, "yyyy-MM-dd");

  return `${dateString}T00:00:00.000Z`;
};
