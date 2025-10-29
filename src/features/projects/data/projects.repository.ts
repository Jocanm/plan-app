import prisma from "@/lib/prisma";
import { IProjectRepository } from "../domain/types/repository";

export const getProjectsForSidebar: IProjectRepository["getProjectsForSidebar"] =
  async userId => {
    const projects = await prisma.project.findMany({
      where: { userId },
      select: {
        id: true,
        name: true,
        color: true,
      },
    });

    return projects.map(el => ({
      id: el.id,
      name: el.name,
      color: el.color,
      totalPendingTasks: 0,
    }));
  };
