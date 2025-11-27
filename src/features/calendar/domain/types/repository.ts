import {
  CalendarEvent,
  CalendarEventWithTask,
  CreateCalendarEventData,
} from "./calendar-event";

export interface ICalendarEventRepository {
  create: (data: CreateCalendarEventData) => Promise<CalendarEvent>;
  getByUserAndDate: (
    userId: string,
    date: Date | string
  ) => Promise<CalendarEventWithTask[]>;
}
