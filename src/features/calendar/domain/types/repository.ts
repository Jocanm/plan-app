import { CalendarEvent, CreateCalendarEventData } from "./calendar-event";

export interface ICalendarEventRepository {
  create: (data: CreateCalendarEventData) => Promise<CalendarEvent>;
}
