"use server";

import { cacheLife, cacheTag } from "next/cache";
import { projectsRepository } from "../../data/projects.repository.factory";
import { projectsUseCases } from "../use-cases/projectsUseCases";

export const getProjectsForSidebar = async (userId: string) => {
  "use cache";
  cacheTag(`projects-${userId}`, "projects-sidebar");
  cacheLife({
    stale: 0,
    revalidate: 60,
    expire: 1800,
  });
  return await projectsUseCases.getProjectsForSidebar({
    userId,
    repo: projectsRepository,
  });
};
