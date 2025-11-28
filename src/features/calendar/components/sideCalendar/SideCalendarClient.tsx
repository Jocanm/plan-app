"use client";

import { Button } from "@/components/ui";
import { InlineError } from "@/shared/components/errors/inline/InlineError";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useCalendarEventsQuery } from "../../app/hooks/queries/useCalendarEvents";
import { toCalendarDateISO } from "../../domain/utils";
import { DayCalendar } from "../dayCalendar/DayCalendar";
import { SideCalendarSkeleton } from "./SideCalendarSkeleton";

interface SideCalendarClientProps {
  userId: string;
}
export const SideCalendarClient = ({ userId }: SideCalendarClientProps) => {
  const t = useTranslations("error.inline");
  const [today] = useState(() => toCalendarDateISO(new Date()));
  const { data, isLoading, refetch, isFetching } = useCalendarEventsQuery(
    today,
    userId
  );

  if (isLoading || !data) return <SideCalendarSkeleton />;
  if (data.error)
    return (
      <InlineError className="h-full">
        <Button disabled={isFetching} variant="link" onClick={() => refetch()}>
          {t("retry")}
        </Button>
      </InlineError>
    );

  return (
    <>
      <DayCalendar
        events={data.result.map(event => ({
          end: event.endTime,
          start: event.startTime,
          title: event.task.title,
        }))}
      />
    </>
  );
};
