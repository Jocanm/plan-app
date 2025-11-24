import { CalendarEvent as PrismaCalendarEvent } from "@prisma/client";

export type CalendarEvent = PrismaCalendarEvent;

export interface CreateCalendarEventInput {
  taskId: string;
  userId: string;
  date: Date | string;
  endTime: Date | string;
  startTime: Date | string;
}

export type CreateCalendarEventData = Omit<
  CalendarEvent,
  "id" | "createdAt" | "updatedAt"
>;
