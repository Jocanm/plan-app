import {
  createErrorResult,
  createSuccessResult,
} from "@/shared/utils/resultPattern";
import { CreateCalendarEventInput } from "../../domain/types/calendar-event";
import { ICalendarEventRepository } from "../../domain/types/repository";
import { CreateCalendarEventResult } from "../../domain/types/results";

interface CalendarEventUseCaseProps {
  repo: ICalendarEventRepository;
}

interface CreateCalendarEventProps extends CalendarEventUseCaseProps {
  data: CreateCalendarEventInput;
}

const createCalendarEvent = async ({
  repo,
  data,
}: CreateCalendarEventProps): Promise<CreateCalendarEventResult> => {
  try {
    const calendarEvent = await repo.create(data);
    return createSuccessResult(calendarEvent);
  } catch {
    return createErrorResult(
      "UNKNOWN_ERROR",
      "something went wrong creating calendar event"
    );
  }
};

export const calendarEventsUseCases = {
  createCalendarEvent,
};
