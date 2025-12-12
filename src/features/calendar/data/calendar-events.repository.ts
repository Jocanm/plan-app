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
          select: {
            id: true,
            title: true,
            projectId: true,
            color: true,
            project: { select: { color: true } },
          },
        },
      },
      orderBy: { startTime: "asc" },
    });

    return calendarEvents.map(event => ({
      ...event,
      task: {
        ...event.task,
        projectColor: event.task.project?.color,
      },
    }));
  };

export const update: ICalendarEventRepository["update"] = async data => {
  const { id, ...updateData } = data;

  const calendarEvent = await prisma.calendarEvent.update({
    where: { id },
    data: updateData,
  });

  return calendarEvent;
};

export const getById: ICalendarEventRepository["getById"] = async id => {
  const calendarEvent = await prisma.calendarEvent.findUnique({
    where: { id },
  });

  return calendarEvent;
};
