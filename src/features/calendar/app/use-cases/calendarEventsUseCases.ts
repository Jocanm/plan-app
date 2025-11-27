import { handleCatchError } from "@/shared/utils/errors/handleCatchError";
import {
  createErrorResult,
  createSuccessResult,
} from "@/shared/utils/resultPattern";
import { buildCreateCalendarEventData } from "../../domain/factories";
import { CreateCalendarEventInput } from "../../domain/types/calendar-event";
import { ICalendarEventRepository } from "../../domain/types/repository";
import {
  CreateCalendarEventResult,
  GetCalendarEventsByUserAndDateResult,
} from "../../domain/types/results";
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
  } catch (error) {
    return handleCatchError(error);
  }
};

interface GetByUserAndDateProps extends CalendarEventUseCaseProps {
  userId: string;
  date: Date | string;
}

const getByUserAndDate = async ({
  date,
  repo,
  userId,
}: GetByUserAndDateProps): Promise<GetCalendarEventsByUserAndDateResult> => {
  try {
    const events = await repo.getByUserAndDate(userId, date);
    return createSuccessResult(events);
  } catch (error) {
    return handleCatchError(error);
  }
};

export const calendarEventsUseCases = {
  getByUserAndDate,
  createCalendarEvent,
};
