import { handleCatchError } from "@/shared/utils/errors/handleCatchError";
import {
  createErrorResult,
  createSuccessResult,
} from "@/shared/utils/resultPattern";
import {
  buildCreateCalendarEventData,
  buildUpdateCalendarEventData,
} from "../../domain/factories";
import {
  CreateCalendarEventInput,
  UpdateCalendarEventInput,
} from "../../domain/types/calendar-event";
import { ICalendarEventRepository } from "../../domain/types/repository";
import {
  CreateCalendarEventResult,
  GetCalendarEventsByUserAndDateResult,
  UpdateCalendarEventResult,
} from "../../domain/types/results";
import {
  validateCalendarEventDateRange,
  validateUpdateCalendarEventInput,
} from "../../domain/validations";

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
    return handleCatchError(error, "An error occurred creating calendar event");
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
    return handleCatchError(
      error,
      "An error occurred fetching calendar events"
    );
  }
};

interface UpdateCalendarEventProps extends CalendarEventUseCaseProps {
  data: UpdateCalendarEventInput;
}

const updateCalendarEvent = async ({
  repo,
  data,
}: UpdateCalendarEventProps): Promise<UpdateCalendarEventResult> => {
  try {
    const inputValidation = validateUpdateCalendarEventInput(data);
    if (inputValidation.error) {
      return createErrorResult(
        inputValidation.error.code,
        inputValidation.error.message
      );
    }

    const currentEvent = await repo.getById(data.id);
    if (!currentEvent) {
      return createErrorResult("EVENT_NOT_FOUND", "Calendar event not found");
    }

    const updateData = buildUpdateCalendarEventData(data, currentEvent);

    const rangeValidation = validateCalendarEventDateRange(
      updateData.startTime,
      updateData.endTime
    );

    if (rangeValidation.error) {
      return createErrorResult(
        rangeValidation.error.code,
        rangeValidation.error.message
      );
    }

    const updatedEvent = await repo.update(updateData);

    return createSuccessResult(updatedEvent);
  } catch (error) {
    return handleCatchError(error, "An error occurred updating calendar event");
  }
};

export const calendarEventsUseCases = {
  getByUserAndDate,
  createCalendarEvent,
  updateCalendarEvent,
};
