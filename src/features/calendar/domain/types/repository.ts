import {
  CalendarEvent,
  CalendarEventWithTask,
  CreateCalendarEventData,
  UpdateCalendarEventData,
} from "./calendar-event";

export interface ICalendarEventRepository {
  create: (data: CreateCalendarEventData) => Promise<CalendarEvent>;
  getByUserAndDate: (
    userId: string,
    date: Date | string
  ) => Promise<CalendarEventWithTask[]>;
  update: (data: UpdateCalendarEventData) => Promise<CalendarEvent>;
  getById: (id: string) => Promise<CalendarEvent | null>;
}
