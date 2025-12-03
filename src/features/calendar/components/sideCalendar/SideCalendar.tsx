/* eslint-disable react-hooks/error-boundaries */
import { getCurrentUser } from "@/features/auth/app/queries/getCurrentUser";
import { getQueryClient } from "@/lib/query/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { clientCalendarEventsTags } from "../../app/cache/tags";
import { getCalendarEventsForUser } from "../../app/queries/calendar-events.queries";
import { toCalendarDateISO } from "../../domain/utils";
import { SideCalendarClient } from "./SideCalendarClient";
import { SideCalendarRequestError } from "./SideCalendarRequestError";

export const SideCalendar = async () => {
  const queryClient = getQueryClient();
  const user = await getCurrentUser();
  const today = toCalendarDateISO(new Date());

  try {
    await queryClient.fetchQuery({
      queryKey: clientCalendarEventsTags.byUserAndDate(user.id, today),
      queryFn: async () => {
        const response = await getCalendarEventsForUser(today, user.id);
        if (response.error) throw response.error;
        return response.result;
      },
    });

    return (
      <div className="bg-card shrink-0 py-5 h-full">
        <Suspense>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <SideCalendarClient userId={user.id} />
          </HydrationBoundary>
        </Suspense>
      </div>
    );
  } catch {
    return <SideCalendarRequestError date={today} userId={user.id} />;
  }
};
