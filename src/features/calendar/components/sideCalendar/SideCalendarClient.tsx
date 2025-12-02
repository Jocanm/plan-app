"use client";

import { Button } from "@/components/ui";
import { InlineError } from "@/shared/components/errors/inline/InlineError";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { useCalendarEventsQuery } from "../../app/hooks/queries/useCalendarEvents";
import { useCalendarDropSlot } from "../../app/hooks/useCalendarDropSlot";
import { toCalendarDateISO } from "../../domain/utils";
import { DayCalendar } from "../dayCalendar/DayCalendar";
import { SideCalendarSkeleton } from "./SideCalendarSkeleton";

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
      onDragStart: () => setIsDragging(true),
      onDrop: () => setIsDragging(false),
    });
  }, []);

  if (status === "pending") return <SideCalendarSkeleton />;
  if (status === "error" || data.error) {
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
        events={data.result.map(event => ({
          end: event.endTime,
          start: event.startTime,
          title: event.task.title,
        }))}
        components={{
          timeSlotWrapper: (props: TimeSlotWrapperProps) => (
            <TimeSlotWrapper {...props} />
          ),
        }}
      />
    </div>
  );
};

interface TimeSlotWrapperProps {
  [key: string]: unknown;
  children?: React.ReactNode;
}

const TimeSlotWrapper = ({ children, ...props }: TimeSlotWrapperProps) => {
  const { ref, isDraggedOver } = useCalendarDropSlot();

  return (
    <div
      ref={ref}
      {...props}
      className={clsx(
        "flex-1",
        isDraggedOver && "bg-primary/10 border-2 border-primary border-dashed",
        props.className as string
      )}
    >
      {children}
    </div>
  );
};
