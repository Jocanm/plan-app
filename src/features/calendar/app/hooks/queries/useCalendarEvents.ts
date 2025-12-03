import { useQuery } from "@tanstack/react-query";
import { getUserEvents } from "../../actions/calendar-events.actions";
import { clientCalendarEventsTags } from "../../cache/tags";

export const useCalendarEventsQuery = (date: string, userId: string) => {
  return useQuery({
    queryFn: async () => {
      const response = await getUserEvents(date, userId);
      if (response.error) throw response.error;
      return response.result;
    },
    queryKey: clientCalendarEventsTags.byUserAndDate(userId, date),
  });
};
