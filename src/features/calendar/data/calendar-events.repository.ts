import prisma from "@/lib/prisma";
import { ICalendarEventRepository } from "../domain/types/repository";

export const create: ICalendarEventRepository["create"] = async data => {
  const calendarEvent = await prisma.calendarEvent.create({
    data,
  });

  return calendarEvent;
};

export const getByUserAndDate: ICalendarEventRepository["getByUserAndDate"] =
  async (userId, date) => {
    const calendarEvents = await prisma.calendarEvent.findMany({
      where: {
        date,
        userId,
      },
      include: {
        task: {
          select: { id: true, title: true, projectId: true, color: true },
        },
      },
      orderBy: { startTime: "asc" },
    });

    return calendarEvents;
  };
