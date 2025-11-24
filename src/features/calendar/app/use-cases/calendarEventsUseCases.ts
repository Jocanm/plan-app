import {
  createErrorResult,
  createSuccessResult,
} from "@/shared/utils/resultPattern";
import { buildCreateCalendarEventData } from "../../domain/factories";
import { CreateCalendarEventInput } from "../../domain/types/calendar-event";
import { ICalendarEventRepository } from "../../domain/types/repository";
import { CreateCalendarEventResult } from "../../domain/types/results";
import { validateCalendarEventDateRange } from "../../domain/validations";

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
    const calendarEventData = buildCreateCalendarEventData(data);
    const validationResponse = validateCalendarEventDateRange(
      calendarEventData.startTime,
      calendarEventData.endTime
    );

    if (validationResponse.error) {
      return createErrorResult(
        validationResponse.error.code,
        validationResponse.error.message
      );
    }

    const calendarEvent = await repo.create(calendarEventData);
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
