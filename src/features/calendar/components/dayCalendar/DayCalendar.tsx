"use client";

import { format, getDay, parse, startOfWeek } from "date-fns";
import { enUS, es } from "date-fns/locale";
import { useLocale } from "next-intl";
import React from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { CalendarEventData } from "../../domain/types/calendar-event";

const DnDCalendar = withDragAndDrop<CalendarEventData>(Calendar);

const locales = { es, en: enUS };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

type DayCalendarProps = Partial<React.ComponentProps<typeof DnDCalendar>>;

export const DayCalendar = (props: DayCalendarProps) => {
  const locale = useLocale();

  return (
    <div className="h-full [&_.rbc-time-header]:hidden!">
      <DnDCalendar
        culture={locale}
        localizer={localizer}
        formats={{
          timeGutterFormat: "h a",
          selectRangeFormat: ({ start, end }, culture, localizer) => {
            if (localizer) {
              return `${localizer.format(start, "h:mm a", culture)} - ${localizer.format(end, "h:mm a", culture)}`;
            }
            return `${format(start, "h:mm a")} - ${format(end, "h:mm a")}`;
          },
        }}
        views={["day"]}
        defaultView="day"
        toolbar={false}
        dayLayoutAlgorithm="no-overlap"
        {...props}
      />
    </div>
  );
};
