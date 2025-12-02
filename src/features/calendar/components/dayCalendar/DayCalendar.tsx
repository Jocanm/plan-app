"use client";

import { format, getDay, parse, startOfWeek } from "date-fns";
import { enUS, es } from "date-fns/locale";
import { useLocale } from "next-intl";
import {
  Calendar,
  CalendarProps,
  dateFnsLocalizer,
  Event,
} from "react-big-calendar";

const locales = { es, en: enUS };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface DayCalendarProps extends Partial<CalendarProps> {
  events: Event[];
}

export const DayCalendar = ({ events, ...props }: DayCalendarProps) => {
  const locale = useLocale();

  return (
    <div className="h-full [&_.rbc-time-header]:hidden!">
      <Calendar
        events={events}
        selectable
        culture={locale}
        localizer={localizer}
        formats={{
          timeGutterFormat: "h a",
        }}
        step={60}
        timeslots={1}
        views={["day"]}
        defaultView="day"
        toolbar={false}
        {...props}
      />
    </div>
  );
};
