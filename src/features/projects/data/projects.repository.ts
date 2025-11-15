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
      orderBy: { createdAt: "asc" },
    });

    return projects.map(el => ({
      id: el.id,
      name: el.name,
      color: el.color,
    }));
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

export const createProject: IProjectRepository["createProject"] =
  async data => {
    const projectCreated = await prisma.project.create({
      data,
    });

    return projectCreated;
  };

export const countByUser: IProjectRepository["countByUser"] = async userId => {
  return await prisma.project.count({ where: { userId } });
};
