"use server";

import { cacheLife, cacheTag } from "next/cache";
import {
  createErrorResult,
  createSuccessResult,
  IResult,
} from "../../../../shared/utils/resultPattern";
import { getCurrentUser } from "../../../auth/app/actions/getCurrentUser";
import { projectsRepository } from "../../data/projects.repository.factory";
import { Project } from "../../domain/types/project";
import { CreateProjectErrorCode } from "../../domain/types/results";
import { createProjectSchema } from "../schemas/createProject.schema";
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

export const getProjectDetails = async (projectId: string, userId: string) => {
  "use cache";
  cacheTag(`projects-${userId}`, `project-details-${projectId}`);
  cacheLife("minutes");

  return await projectsUseCases.getProjectDetails({
    userId,
    projectId,
    repo: projectsRepository,
  });
};

type CreateProjectActionErrorCode =
  | CreateProjectErrorCode
  | "VALIDATION_ERROR"
  | "UNAUTHORIZED";

export const createProject = async (data: {
  name: string;
  color?: string;
}): Promise<IResult<Project, CreateProjectActionErrorCode>> => {
  const parsedData = createProjectSchema.safeParse(data);
  if (!parsedData.success) {
    return createErrorResult("VALIDATION_ERROR", parsedData.error.message);
  }

  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return createErrorResult("UNAUTHORIZED", "You must be logged in");
  }

  const response = await projectsUseCases.createProject({
    repo: projectsRepository,
    data: {
      ...parsedData.data,
      userId: currentUser.id,
    },
  });

  if (response.error) {
    return createErrorResult(response.error.code, response.error.message);
  }

  return createSuccessResult(response.result);
};
