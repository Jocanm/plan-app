import { getCurrentUser } from "@/features/auth/app/queries/getCurrentUser";
import { Suspense } from "react";
import { getCalendarEventsForUser } from "../../app/queries/calendar-events.queries";
import { DayCalendar } from "../dayCalendar/DayCalendar";

export const SideCalendar = async () => {
  const user = await getCurrentUser();
  await getCalendarEventsForUser("2023-01-01", user.id);

  return (
    <div className="bg-card shrink-0 py-5 h-full">
      <Suspense>
        <DayCalendar />
      </Suspense>
    </div>
  );
};
