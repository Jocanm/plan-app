"use client";

import { cn } from "@/shared/utils/cn";
import { add } from "date-fns";
import { useLocale } from "next-intl";
import { MIN_CALENDAR_EVENT_DURATION_MINUTES } from "../../../domain/constants";
import { formatEventTime, isShortEvent } from "../../../domain/utils";

export interface CalendarEventPreviewProps {
  taskTitle: string;
  taskColor: string;
  projectColor?: string;
  startTime: Date;
}

export const CalendarEventPreview = ({
  taskTitle,
  taskColor,
  projectColor,
  startTime,
}: CalendarEventPreviewProps) => {
  const locale = useLocale();

  const endTime = add(startTime, {
    minutes: MIN_CALENDAR_EVENT_DURATION_MINUTES,
  });

  const isShort = isShortEvent(startTime, endTime);

  const timeRange = formatEventTime({
    locale,
    short: isShort,
    end: endTime,
    start: startTime,
  });

  const color = projectColor ?? taskColor;

  return (
    <div
      className={cn(
        "absolute inset-0 m-1",
        "px-2 py-1 rounded-md",
        "border-l-4",
        "opacity-70",
        "shadow-sm",
        "pointer-events-none",
        "transition-opacity duration-200"
      )}
      style={{
        borderLeftColor: color,
        backgroundColor: `${color}B3`,
      }}
    >
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
              style={{ backgroundColor: color }}
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
          {taskTitle}
        </span>
      </div>
    </div>
  );
};
