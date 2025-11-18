"use client";

import { add, format, getDay, parse, startOfWeek } from "date-fns";
import { enUS, es } from "date-fns/locale";
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
  return (
    <div style={{ height: "100%" }}>
      <Calendar
        localizer={localizer}
        events={[
          {
            start: new Date(),
            end: add(new Date(), { hours: 1 }),
            title: "Evento de ejemplo",
          },
        ]}
        defaultView="day"
        views={["day"]}
        components={{
          header: () => null,
          toolbar: () => null,
        }}
        formats={{
          timeGutterFormat: "h a",
        }}
        style={{}}
      />
    </div>
  );
};
