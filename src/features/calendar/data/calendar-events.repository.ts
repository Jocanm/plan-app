import prisma from "@/lib/prisma";
import { ICalendarEventRepository } from "../domain/types/repository";

export const create: ICalendarEventRepository["create"] = async data => {
  const calendarEvent = await prisma.calendarEvent.create({
    data,
  });

  return calendarEvent;
};
