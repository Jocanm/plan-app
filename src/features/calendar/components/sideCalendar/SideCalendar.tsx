import { getCurrentUser } from "@/features/auth/app/queries/getCurrentUser";
import { Suspense } from "react";
import { getCalendarEventsForUser } from "../../app/queries/calendar-events.queries";
import { DayCalendar } from "../dayCalendar/DayCalendar";
import { SideCalendarRequestError } from "./SideCalendarRequestError";

export const SideCalendar = async () => {
  const user = await getCurrentUser();
  const { error } = await getCalendarEventsForUser(
    "2025-01-01T00:00:00.000Z",
    user.id
  );

  if (error) {
    return (
      <SideCalendarRequestError
        userId={user.id}
        date="2025-01-01T00:00:00.000Z"
      />
    );
  }

  return (
    <div className="bg-card shrink-0 py-5 h-full">
      <Suspense>
        <DayCalendar />
      </Suspense>
    </div>
  );
};
