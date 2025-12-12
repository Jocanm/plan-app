import { IResult } from "@/shared/utils/resultPattern";
import { CalendarEvent, CalendarEventWithTask } from "./calendar-event";

export type CreateCalendarEventErrorCode =
  | "UNKNOWN_ERROR"
  | "END_BEFORE_START"
  | "SAME_START_END";

export type CreateCalendarEventResult = IResult<
  CalendarEvent,
  CreateCalendarEventErrorCode
>;

export type GetCalendarEventsByUserAndDateErrorCode = "UNKNOWN_ERROR";

export type GetCalendarEventsByUserAndDateResult = IResult<
  CalendarEventWithTask[],
  GetCalendarEventsByUserAndDateErrorCode
>;

export type UpdateCalendarEventErrorCode =
  | "UNKNOWN_ERROR"
  | "EVENT_NOT_FOUND"
  | "END_BEFORE_START"
  | "SAME_START_END"
  | "NO_CHANGES_PROVIDED";

export type UpdateCalendarEventResult = IResult<
  CalendarEvent,
  UpdateCalendarEventErrorCode
>;
