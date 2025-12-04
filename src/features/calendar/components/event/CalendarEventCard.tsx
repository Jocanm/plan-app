"use client";

import { cn } from "@/shared/utils/cn";
import { useLocale } from "next-intl";
import { EventProps } from "react-big-calendar";
import { CalendarEventData } from "../../domain/types/calendar-event";
import { formatEventTime, isShortEvent } from "../../domain/utils";

export const CalendarEventCard = ({ event }: EventProps<CalendarEventData>) => {
  const locale = useLocale();
  const isShort = isShortEvent(event.start, event.end);

  const timeRange = formatEventTime({
    start: event.start,
    end: event.end,
    locale,
    short: isShort,
  });

  return (
    <div
      className={cn(
        "h-full px-2 py-1 rounded-md overflow-hidden",
        "transition-all duration-200",
        "hover:opacity-90",
        "shadow-sm hover:shadow-md",
        "border-l-4"
      )}
      style={{
        backgroundColor: `${event.color}15`,
        borderLeftColor: event.color,
      }}
    >
      {isShort ? (
        // Layout inline para eventos cortos
        <div className="flex items-center gap-2 h-full">
          <span
            className="h-2 w-2 rounded-sm flex-shrink-0"
            aria-hidden="true"
            style={{
              backgroundColor: event.color,
            }}
          />
          <span
            className="text-xs font-medium flex-shrink-0"
            style={{ color: `${event.color}B3` }}
          >
            {timeRange}
          </span>
          <span
            style={{ color: event.color }}
            className="text-sm font-medium truncate"
          >
            {event.title}
          </span>
        </div>
      ) : (
        // Layout stack para eventos largos
        <div className="flex flex-col gap-0.5 h-full">
          <div className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-sm flex-shrink-0"
              aria-hidden="true"
              style={{
                backgroundColor: event.color,
              }}
            />
            <span
              className="text-xs font-medium"
              style={{ color: `${event.color}B3` }}
            >
              {timeRange}
            </span>
          </div>
          <span
            style={{ color: event.color }}
            className="text-sm font-medium truncate pl-4"
          >
            {event.title}
          </span>
        </div>
      )}
    </div>
  );
};
