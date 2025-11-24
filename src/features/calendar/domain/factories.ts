import { add } from "date-fns";
import { MIN_CALENDAR_EVENT_DURATION_MINUTES } from "./constants";
import {
  CreateCalendarEventData,
  CreateCalendarEventInput,
} from "./types/calendar-event";

export const buildCreateCalendarEventData = (
  input: CreateCalendarEventInput
): CreateCalendarEventData => {
  const { taskId, userId, date, startTime, endTime } = input;

  return {
    taskId,
    userId,
    date,
    startTime,
    endTime: endTime
      ? endTime
      : buildCalendarEndTime(startTime, MIN_CALENDAR_EVENT_DURATION_MINUTES),
  };
};

export const buildCalendarEndTime = (
  startTime: Date,
  durationMinutes = MIN_CALENDAR_EVENT_DURATION_MINUTES
): Date => {
  return add(startTime, { minutes: durationMinutes });
};
