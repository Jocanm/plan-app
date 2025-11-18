import { Suspense } from "react";
import { DayCalendar } from "../dayCalendar/DayCalendar";

export const SideCalendar = () => {
  return (
    <div className="w-96 h-full border-l py-6 flex flex-col bg-card">
      <Suspense>
        <DayCalendar />
      </Suspense>
    </div>
  );
};
