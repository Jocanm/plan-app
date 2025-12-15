"use client";

import { Button } from "@/components/ui";
import { InlineError } from "@/shared/components/errors/inline/InlineError";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useCalendarEventsModel } from "../../app/hooks/useCalendarEventsModel";
import { useIsDraggingInCalendar } from "../../app/hooks/useIsDraggingInCalendar";
import { useScrollToCurrentTime } from "../../app/hooks/useScrollToCurrentTime";
import { useSideCalendarCurrentDate } from "../../app/hooks/useSideCalendarCurrentDate";
import { useUpdateEventRange } from "../../app/hooks/useUpdateEventRange";
import { MIN_CALENDAR_EVENT_DURATION_MINUTES } from "../../domain/constants";
import { DayCalendar } from "../dayCalendar/DayCalendar";
import { CalendarEventCard } from "../event/CalendarEventCard";
import { CalendarHeader } from "./CalendarHeader";
import { SideCalendarSkeleton } from "./SideCalendarSkeleton";
import {
  SideCalendarTimeSlotWrapper,
  SideCalendarTimeSlotWrapperProps,
} from "./slots/SideCalendarTimeSlotWrapper";

interface SideCalendarClientProps {
  userId: string;
}

export const SideCalendarClient = ({ userId }: SideCalendarClientProps) => {
  const t = useTranslations("error.inline");
  const isDragging = useIsDraggingInCalendar();
  const { currentDate } = useSideCalendarCurrentDate();

  const { handleEventRangeUpdate } = useUpdateEventRange();
  const { data, status, isFetching, refetch } = useCalendarEventsModel(userId);

  const { containerRef } = useScrollToCurrentTime();

  if (status === "pending") return <SideCalendarSkeleton />;
  if (status === "error") {
    return (
      <InlineError className="h-full">
        <Button disabled={isFetching} variant="link" onClick={() => refetch()}>
          {t("retry")}
        </Button>
      </InlineError>
    );
  }

  return (
    <div className="h-full flex flex-col" ref={containerRef}>
      <CalendarHeader />
      <div
        className={clsx(
          "flex-1 py-5",
          isDragging && "[&_.rbc-events-container]:pointer-events-none"
        )}
      >
        <DayCalendar
          events={data.map(event => ({
            id: event.id,
            end: event.endTime,
            start: event.startTime,
            title: event.task.title,
            taskColor: event.task.color,
            isOptimistic: event.isOptimistic,
            projectColor: event.task.projectColor,
          }))}
          components={{
            event: CalendarEventCard,
            timeSlotWrapper: (props: SideCalendarTimeSlotWrapperProps) => (
              <SideCalendarTimeSlotWrapper {...props} />
            ),
          }}
          onEventDrop={data => handleEventRangeUpdate(data, userId)}
          onEventResize={data => handleEventRangeUpdate(data, userId)}
          timeslots={1}
          step={MIN_CALENDAR_EVENT_DURATION_MINUTES}
          date={currentDate}
        />
      </div>
    </div>
  );
};
