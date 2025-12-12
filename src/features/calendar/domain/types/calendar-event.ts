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
  date: Date | string;
  endTime?: Date | string;
  startTime: Date | string;
}

export type CreateCalendarEventData = {
  id?: string;
  taskId: string;
  userId: string;
  date: Date | string;
  startTime: Date | string;
  endTime: Date | string;
};

export interface UpdateCalendarEventInput {
  id: string;
  date: Date | string;
  startTime?: Date | string;
  endTime?: Date | string;
}

export type UpdateCalendarEventData = {
  id: string;
  date: Date | string;
  startTime: Date | string;
  endTime: Date | string;
};

export type CalendarEventData = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  taskColor: string;
  projectColor?: string;
};
