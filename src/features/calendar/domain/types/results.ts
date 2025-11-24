import { IResult } from "@/shared/utils/resultPattern";
import { CalendarEvent } from "./calendar-event";

export type CreateCalendarEventErrorCode =
  | "UNKNOWN_ERROR"
  | "END_BEFORE_START"
  | "SAME_START_END";

export type CreateCalendarEventResult = IResult<
  CalendarEvent,
  CreateCalendarEventErrorCode
>;
