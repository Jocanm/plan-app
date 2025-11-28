import { useQuery } from "@tanstack/react-query";
import { getUserEvents } from "../../actions/calendar-events.actions";

export const useCalendarEventsQuery = (date: string, userId: string) => {
  return useQuery({
    queryKey: ["calendarEvents", userId, date],
    queryFn: () => getUserEvents(date, userId),
  });
};
