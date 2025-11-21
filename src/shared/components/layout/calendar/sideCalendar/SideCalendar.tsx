import { Suspense } from "react";
import { DayCalendar } from "../dayCalendar/DayCalendar";

export const SideCalendar = () => {
  return (
    <div className="bg-card shrink-0">
      <Suspense>
        <DayCalendar />
      </Suspense>
    </div>
  );
};
