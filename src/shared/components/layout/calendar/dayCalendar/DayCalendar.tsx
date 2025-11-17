"use client";

import { format, getDay, parse, startOfWeek } from "date-fns";
import { enUS, es } from "date-fns/locale";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {
  es,
  en: enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export const DayCalendar = () => {
  return <Calendar defaultView="day" views={["day"]} localizer={localizer} />;
};
