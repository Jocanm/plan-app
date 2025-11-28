import { getCurrentUser } from "@/features/auth/app/queries/getCurrentUser";
import { getQueryClient } from "@/lib/query/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { getCalendarEventsForUser } from "../../app/queries/calendar-events.queries";
import { toCalendarDateISO } from "../../domain/utils";
import { SideCalendarClient } from "./SideCalendarClient";
import { SideCalendarRequestError } from "./SideCalendarRequestError";

export const SideCalendar = async () => {
  const queryClient = getQueryClient();
  const user = await getCurrentUser();
  const today = toCalendarDateISO(new Date());

  const { error } = await queryClient.fetchQuery({
    queryKey: ["calendarEvents", user.id, today],
    queryFn: () => getCalendarEventsForUser(today, user.id),
  });

  if (error) {
    return <SideCalendarRequestError date={today} userId={user.id} />;
  }

  return (
    <div className="bg-card shrink-0 py-5 h-full">
      <Suspense>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <SideCalendarClient userId={user.id} />
        </HydrationBoundary>
      </Suspense>
    </div>
  );
};
