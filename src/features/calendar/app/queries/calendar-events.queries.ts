import { calendarEventsRepository } from "../../data/calendar-events.repository.factory";
import { calendarEventsUseCases } from "../use-cases/calendarEventsUseCases";

export const getCalendarEventsForUser = async (
  date: string,
  userId: string
) => {
  return await calendarEventsUseCases.getByUserAndDate({
    date,
    userId,
    repo: calendarEventsRepository,
  });
};
