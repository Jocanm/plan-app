"use server";

import { UnauthorizedErrorCode } from "@/shared/types/results";
import { handleCatchError } from "@/shared/utils/errors/handleCatchError";
import {
  createErrorResult,
  createSuccessResult,
  IResult,
} from "@/shared/utils/resultPattern";
import { updateTag } from "next/cache";
import { calendarEventsRepository } from "../../data/calendar-events.repository.factory";
import { CalendarEvent } from "../../domain/types/calendar-event";
import {
  CreateCalendarEventErrorCode,
  UpdateCalendarEventErrorCode,
} from "../../domain/types/results";
import { calendarEventsTags } from "../cache/tags";
import { getCalendarEventsForUser } from "../queries/calendar-events.queries";
import { calendarEventsUseCases } from "../use-cases/calendarEventsUseCases";

export const getUserEvents = async (date: string, userId: string) => {
  try {
    return await getCalendarEventsForUser(date, userId);
  } catch (error) {
    return handleCatchError(error, "An error occurred in getUserEvents action");
  }
};

export type CreateCalendarEventActionErrorCode =
  | CreateCalendarEventErrorCode
  | UnauthorizedErrorCode;

export type CreateCalendarEventActionPayload = {
  id: string;
  date: string;
  userId: string;
  taskId: string;
  endTime?: string;
  startTime: string;
};

export const createCalendarEvent = async (
  data: CreateCalendarEventActionPayload
): Promise<IResult<CalendarEvent, CreateCalendarEventActionErrorCode>> => {
  try {
    const { result, error } = await calendarEventsUseCases.createCalendarEvent({
      repo: calendarEventsRepository,
      data,
    });

    if (error) {
      return createErrorResult(error.code, error.message);
    }

    updateTag(calendarEventsTags.byUserAndDate(data.userId, data.date));
    return createSuccessResult(result);
  } catch (error) {
    return handleCatchError(
      error,
      "An error occurred in createCalendarEvent action"
    );
  }
};

export type UpdateCalendarEventActionErrorCode =
  | UpdateCalendarEventErrorCode
  | UnauthorizedErrorCode;

export type UpdateCalendarEventActionPayload = {
  id: string;
  date: string;
  startTime?: string;
  endTime?: string;
};

export const updateCalendarEvent = async (
  data: UpdateCalendarEventActionPayload
): Promise<IResult<CalendarEvent, UpdateCalendarEventActionErrorCode>> => {
  try {
    const { result: event, error } =
      await calendarEventsUseCases.updateCalendarEvent({
        repo: calendarEventsRepository,
        data,
      });

    if (error) {
      return createErrorResult(error.code, error.message);
    }

    updateTag(calendarEventsTags.byUserAndDate(event.userId, data.date));

    return createSuccessResult(event);
  } catch (error) {
    return handleCatchError(
      error,
      "An error occurred in updateCalendarEvent action"
    );
  }
};
