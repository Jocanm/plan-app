"use client";

import { Button } from "@/components/ui";
import { InlineError } from "@/shared/components/errors/inline/InlineError";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useCalendarEventsQuery } from "../../app/hooks/queries/useCalendarEvents";
import { MIN_CALENDAR_EVENT_DURATION_MINUTES } from "../../domain/constants";
import { toCalendarDateISO } from "../../domain/utils";
import { DayCalendar } from "../dayCalendar/DayCalendar";
import { CalendarEventCard } from "../event/CalendarEventCard";
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
  const [isDragging, setIsDragging] = useState(false);
  const [today] = useState(() => toCalendarDateISO(new Date()));
  const { data, refetch, isFetching, status } = useCalendarEventsQuery(
    today,
    userId
  );

  useEffect(() => {
    return monitorForElements({
      onDrop: () => setIsDragging(false),
      onDragStart: () => setIsDragging(true),
    });
  }, []);

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
    <div
      className={clsx(
        isDragging && "[&_.rbc-events-container]:pointer-events-none"
      )}
    >
      <DayCalendar
        events={data.map(event => ({
          end: event.endTime,
          start: event.startTime,
          title: event.task.title,
          taskColor: event.task.color,
          projectColor: event.task.projectColor,
        }))}
        components={{
          event: CalendarEventCard,
          timeSlotWrapper: (props: SideCalendarTimeSlotWrapperProps) => (
            <SideCalendarTimeSlotWrapper {...props} />
          ),
        }}
        timeslots={1}
        step={MIN_CALENDAR_EVENT_DURATION_MINUTES}
      />
    </div>
  );
};
