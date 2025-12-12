"use client";

import { cn } from "@/shared/utils/cn";
import { useLocale } from "next-intl";
import { EventProps } from "react-big-calendar";
import { BaseLoader } from "../../../../shared/components/custom/BaseLoader";
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
        "border-l-4",
        "relative",
        {
          "opacity-50 cursor-progress hover:opacity-50": event.isOptimistic,
        }
      )}
      style={{
        borderLeftColor: event.projectColor,
        backgroundColor: `${event.projectColor}B3`,
      }}
    >
      {event.isOptimistic && (
        <BaseLoader className="absolute top-1 right-1 w-3 h-3 border-white" />
      )}
      <div
        className={cn("flex flex-col gap-0.5 text-sm", {
          "flex-row flex-wrap gap-2 items-center": isShort,
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
              "flex-shrink-0 whitespace-nowrap": isShort,
            })}
          >
            {timeRange}
          </span>
        </div>
        <span
          className={cn("font-medium text-white pl-4", {
            "pl-0 truncate flex-1 min-w-0": isShort,
          })}
        >
          {event.title}
        </span>
      </div>
    </div>
  );
};
