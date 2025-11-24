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
