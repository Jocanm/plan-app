import prisma from "../../../lib/prisma";
import { ProjectSidebar } from "../domain/types/project";

export interface DateRange {
  from: Date;
  to: Date;
}

export interface IProjectRepository {
  getProjectsForSidebar: (
    userId: string,
    dateRange: DateRange
  ) => Promise<ProjectSidebar[]>;
}

const getProjectsForSidebar: IProjectRepository["getProjectsForSidebar"] =
  async (userId, dateRange) => {
    const projects = await prisma.project.findMany({
      where: { userId },
      select: {
        id: true,
        name: true,
        color: true,
        _count: {
          select: {
            task: {
              where: {
                isArchived: false,
                calendarEvents: {
                  some: {
                    status: "pending",
                    date: {
                      gte: dateRange.from,
                      lte: dateRange.to,
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    return projects.map(el => ({
      id: el.id,
      name: el.name,
      color: el.color,
      totalPendingTasks: el._count.task,
    }));
  };

export const projectsRepository: IProjectRepository = {
  getProjectsForSidebar,
};
