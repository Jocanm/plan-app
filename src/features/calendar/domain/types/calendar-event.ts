import { CalendarEvent as PrismaCalendarEvent } from "@prisma/client";
import { CalendarEventTask } from "../../../tasks/domain/types/task";

export type CalendarEvent = PrismaCalendarEvent;

export type CalendarEventWithTask = CalendarEvent & {
  task: CalendarEventTask;
};

export interface CreateCalendarEventInput {
  id?: string;
  taskId: string;
  userId: string;
  date: Date;
  endTime?: Date;
  startTime: Date;
}

export type CreateCalendarEventData = Omit<
  CalendarEvent,
  "id" | "createdAt" | "updatedAt"
>;
