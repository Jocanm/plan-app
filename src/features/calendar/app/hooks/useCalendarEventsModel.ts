import { useState } from "react";
import { toCalendarDateISO } from "../../domain/utils";
import { useCalendarEventsQuery } from "./queries/useCalendarEvents";

export const useCalendarEventsModel = (userId: string) => {
  const [date] = useState(() => toCalendarDateISO(new Date()));
  const response = useCalendarEventsQuery(date, userId);

  return {
    ...response,
    date,
  };
};
