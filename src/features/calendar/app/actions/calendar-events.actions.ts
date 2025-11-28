"use server";

import { UnauthorizedErrorCode } from "@/shared/types/results";
import { handleCatchError } from "@/shared/utils/errors/handleCatchError";
import {
  createErrorResult,
  createSuccessResult,
  IResult,
} from "@/shared/utils/resultPattern";
import { getCurrentUser } from "../../../auth/app/queries/getCurrentUser";
import { calendarEventsRepository } from "../../data/calendar-events.repository.factory";
import { CalendarEvent } from "../../domain/types/calendar-event";
import { CreateCalendarEventErrorCode } from "../../domain/types/results";
import { getCalendarEventsForUser } from "../queries/calendar-events.queries";
import { calendarEventsUseCases } from "../use-cases/calendarEventsUseCases";

export const getUserEvents = async (date: string, userId: string) => {
  try {
    return await getCalendarEventsForUser(date, userId);
  } catch (error) {
    return handleCatchError(error, "An error occurred in getUserEvents action");
  }
};

type CreateCalendarEventActionErrorCode =
  | CreateCalendarEventErrorCode
  | UnauthorizedErrorCode;

export const createCalendarEvent = async (data: {
  date: string;
  taskId: string;
  endTime?: string;
  startTime: string;
}): Promise<IResult<CalendarEvent, CreateCalendarEventActionErrorCode>> => {
  try {
    const user = await getCurrentUser();

    const { result, error } = await calendarEventsUseCases.createCalendarEvent({
      repo: calendarEventsRepository,
      data: { ...data, userId: user.id },
    });

    if (error) {
      return createErrorResult(error.code, error.message);
    }

    return createSuccessResult(result);
  } catch (error) {
    return handleCatchError(
      error,
      "An error occurred in createCalendarEvent action"
    );
  }
};
