import prisma from "@/lib/prisma";
import { IProjectRepository } from "../domain/types/repository";

export const getProjectsForSidebar: IProjectRepository["getProjectsForSidebar"] =
  async userId => {
    await prisma.project.findMany({
      where: { userId },
      select: {
        id: true,
        name: true,
        color: true,
      },
      orderBy: { createdAt: "asc" },
    });

    return [];
  };

export const getProjectDetails: IProjectRepository["getProjectDetails"] =
  async (projectId, userId) => {
    const project = await prisma.project.findUnique({
      where: { id: projectId, userId },
      include: {
        tasks: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return project;
  };
