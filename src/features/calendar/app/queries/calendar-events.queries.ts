import { applyCacheBehavior } from "@/shared/utils/applyCache";
import { calendarEventsRepository } from "../../data/calendar-events.repository.factory";
import { calendarEventsTags } from "../cache/tags";
import { calendarEventsUseCases } from "../use-cases/calendarEventsUseCases";

export const getCalendarEventsForUser = async (
  date: string,
  userId: string
) => {
  "use cache";
  applyCacheBehavior({
    profile: "minutes",
    tags: [calendarEventsTags.byUserAndDate(userId, date)],
  });

  return await calendarEventsUseCases.getByUserAndDate({
    date,
    userId,
    repo: calendarEventsRepository,
  });
};
