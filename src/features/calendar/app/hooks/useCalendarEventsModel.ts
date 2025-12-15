import { toCalendarDateISO } from "../../domain/utils";
import { useSideCalendarStore } from "../stores/sideCalendar.store";
import { useCalendarEventsQuery } from "./queries/useCalendarEvents";

export const useCalendarEventsModel = (userId: string) => {
  const currentDate = useSideCalendarStore(state => state.currentDate);
  const response = useCalendarEventsQuery(
    toCalendarDateISO(currentDate),
    userId
  );

  return response;
};
