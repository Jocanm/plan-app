import { CalendarEvent as PrismaCalendarEvent } from "@prisma/client";

export type CalendarEvent = PrismaCalendarEvent;

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
