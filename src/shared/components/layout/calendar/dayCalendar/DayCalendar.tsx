"use client";

import { add, format, getDay, parse, startOfWeek } from "date-fns";
import { enUS, es } from "date-fns/locale";
import { useLocale } from "next-intl";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";

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
  const locale = useLocale();

  return (
    <div className="h-full [&_.rbc-time-header]:hidden! py-5">
      <Calendar
        localizer={localizer}
        culture={locale}
        events={[getEvent()]}
        formats={{
          timeGutterFormat: "h a",
        }}
        views={["day"]}
        defaultView="day"
        toolbar={false}
      />
    </div>
  );
};

const getEvent = () => ({
  start: new Date(),
  end: add(new Date(), { hours: 1 }),
  title: "Ejemplo",
});
