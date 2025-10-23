import prisma from "../../../lib/prisma";
import { ProjectSidebar } from "../domain/types/project";

export interface DateRange {
  from: Date;
  to: Date;
}

export interface IProjectRepository {
  getProjectsForSidebar: (userId: string) => Promise<ProjectSidebar[]>;
}

const getProjectsForSidebar: IProjectRepository["getProjectsForSidebar"] =
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

export const projectsRepository: IProjectRepository = {
  getProjectsForSidebar,
};
