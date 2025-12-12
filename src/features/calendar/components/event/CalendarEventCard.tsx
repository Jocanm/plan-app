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
    locale,
    short: isShort,
    end: event.end,
    start: event.start,
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
        borderLeftColor: event.projectColor,
        backgroundColor: `${event.projectColor}B3`,
      }}
    >
      <div
        className={cn("flex flex-col gap-0.5 text-sm", {
          // "flex-row gap-2 items-center h-full": isShort,
          "grid grid-cols-2 gap-2 w-fit": isShort,
        })}
      >
        <div className="flex items-center gap-2">
          {!isShort && (
            <span
              aria-hidden
              className="h-2 w-2 rounded-sm flex-shrink-0"
              style={{ backgroundColor: event.projectColor }}
            />
          )}
          <span
            className={cn("font-medium text-white", {
              "flex-shrink-0": isShort,
            })}
          >
            {timeRange}
          </span>
        </div>
        <span
          className={cn("font-medium text-white pl-4", {
            "pl-0 line-clamp-1 w-fit": isShort,
          })}
        >
          {event.title}
        </span>
      </div>
    </div>
  );
};
