import { repositoryConfig } from "@/lib/config/repositories";
import { IProjectRepository } from "../domain/types/repository";
import {
  createProject,
  getProjectDetails,
  getProjectsForSidebar,
} from "./projects.repository";
import { createFakeProjectsRepository } from "./projects.repository.fake";

const createProjectsRepository = (
  config = repositoryConfig
): IProjectRepository => {
  if (config.isTest) {
    return createFakeProjectsRepository();
  }

  return {
    createProject,
    getProjectDetails,
    getProjectsForSidebar,
  };
};

export const projectsRepository = createProjectsRepository();
