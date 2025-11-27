import { projectsTags } from "@/lib/cache";
import { applyCacheBehavior } from "@/shared/utils/applyCache";
import { projectsRepository } from "../../data/projects.repository.factory";
import { projectsUseCases } from "../use-cases/projectsUseCases";

export const getProjectsForSidebar = async (userId: string) => {
  "use cache";
  applyCacheBehavior({
    profile: "minutes",
    tags: [projectsTags.byUser(userId)],
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
    tags: [projectsTags.byId(projectId)],
  });

  return await projectsUseCases.getProjectDetails({
    userId,
    projectId,
    repo: projectsRepository,
  });
};
