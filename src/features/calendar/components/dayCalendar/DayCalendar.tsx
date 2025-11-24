"use client";

import { format, getDay, parse, startOfWeek } from "date-fns";
import { enUS, es } from "date-fns/locale";
import { useLocale } from "next-intl";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";

const locales = { es, en: enUS };

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
    <div className="h-full [&_.rbc-time-header]:hidden!">
      <Calendar
        selectable
        culture={locale}
        localizer={localizer}
        formats={{
          timeGutterFormat: "h a",
        }}
        views={["day"]}
        defaultView="day"
        toolbar={false}
        onSelectSlot={({}) => {}}
      />
    </div>
  );
};
