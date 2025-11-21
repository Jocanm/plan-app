import { IResult } from "@/shared/utils/resultPattern";
import { CalendarEvent } from "./calendar-event";

export type CreateCalendarEventErrorCode = "UNKNOWN_ERROR";

export type CreateCalendarEventResult = IResult<
  CalendarEvent,
  CreateCalendarEventErrorCode
>;
