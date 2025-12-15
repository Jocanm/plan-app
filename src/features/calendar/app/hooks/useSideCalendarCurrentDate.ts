import { add } from "date-fns";
import { useSideCalendarStore } from "../stores/sideCalendar.store";

export const useSideCalendarCurrentDate = () => {
  const currentDate = useSideCalendarStore(state => state.currentDate);
  const setCurrentDate = useSideCalendarStore(state => state.setCurrentDate);

  const nextDate = () => {
    const current = new Date(currentDate);
    const next = add(current, { days: 1 });
    setCurrentDate(next.toISOString());
  };

  const previousDate = () => {
    const current = new Date(currentDate);
    const previous = add(current, { days: -1 });
    setCurrentDate(previous.toISOString());
  };

  return {
    nextDate,
    previousDate,

    currentDate: new Date(currentDate),
  };
};
