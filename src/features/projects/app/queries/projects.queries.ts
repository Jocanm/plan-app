import { applyCacheBehavior } from "@/shared/utils/applyCache";
import { projectsRepository } from "../../data/projects.repository.factory";
import { projectsUseCases } from "../use-cases/projectsUseCases";

export const getProjectsForSidebar = async (userId: string) => {
  "use cache";
  applyCacheBehavior({
    profile: "minutes",
    tags: [`projects-list-${userId}`],
  });

  return await projectsUseCases.getProjectsForSidebar({
    userId,
    repo: projectsRepository,
  });
};

export const getProjectDetails = async (projectId: string, userId: string) => {
  "use cache";
  applyCacheBehavior({
    profile: "minutes",
    tags: [`project-${projectId}`],
  });

  return await projectsUseCases.getProjectDetails({
    userId,
    projectId,
    repo: projectsRepository,
  });
};
