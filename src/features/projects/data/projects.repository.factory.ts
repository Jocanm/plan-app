import { repositoryConfig } from "@/lib/config/repositories";
import {
  getProjectsForSidebar,
  IProjectRepository,
} from "./projects.repository";
import { createFakeProjectsRepository } from "./projects.repository.fake";

const createProjectsRepository = (
  config = repositoryConfig
): IProjectRepository => {
  if (config.isTest) {
    return createFakeProjectsRepository();
  }

  return {
    getProjectsForSidebar,
  };
};

export const projectsRepository = createProjectsRepository();
