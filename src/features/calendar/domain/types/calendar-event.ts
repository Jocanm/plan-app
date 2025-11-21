import { CalendarEvent as PrismaCalendarEvent } from "@prisma/client";

export type CalendarEvent = PrismaCalendarEvent;

export interface CreateCalendarEventInput {
  taskId: string;
  userId: string;
  date: Date;
  startTime: Date;
  endTime: Date;
}

export type CreateCalendarEventData = Omit<
  CalendarEvent,
  "id" | "createdAt" | "updatedAt"
>;
