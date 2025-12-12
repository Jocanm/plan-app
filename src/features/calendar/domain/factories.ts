import { add } from "date-fns";
import { MIN_CALENDAR_EVENT_DURATION_MINUTES } from "./constants";
import {
  CalendarEvent,
  CreateCalendarEventData,
  CreateCalendarEventInput,
  UpdateCalendarEventData,
  UpdateCalendarEventInput,
} from "./types/calendar-event";

export const buildCreateCalendarEventData = (
  input: CreateCalendarEventInput
): CreateCalendarEventData => {
  const { taskId, userId, date, startTime, endTime, id } = input;

  return {
    taskId,
    userId,
    date,
    startTime,
    endTime:
      endTime ??
      buildCalendarEndTime(startTime, MIN_CALENDAR_EVENT_DURATION_MINUTES),
    ...(id ? { id } : {}),
  };
};

export const buildCalendarEndTime = (
  startTime: Date | string,
  durationMinutes = MIN_CALENDAR_EVENT_DURATION_MINUTES
): Date => {
  return add(startTime, { minutes: durationMinutes });
};

export const buildUpdateCalendarEventData = (
  input: UpdateCalendarEventInput,
  currentEvent: CalendarEvent
): UpdateCalendarEventData => {
  const newStartTime = input.startTime ?? currentEvent.startTime;
  const newEndTime = input.endTime ?? currentEvent.endTime;

  return {
    id: input.id,
    date: input.date,
    startTime: newStartTime,
    endTime: newEndTime,
  };
};
