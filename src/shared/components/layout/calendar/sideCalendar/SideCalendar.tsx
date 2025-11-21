import { Suspense } from "react";
import { DayCalendar } from "../dayCalendar/DayCalendar";

export const SideCalendar = () => {
  return (
    <div className="hidden md:flex w-72 lg:w-96 h-full border-l flex-col bg-card shrink-0">
      <Suspense>
        <DayCalendar />
      </Suspense>
    </div>
  );
};
