"use server";

import { getCurrentUser } from "@/features/auth/app/actions/getCurrentUser";
import { logger } from "@/lib/logger";
import {
  UnauthorizedErrorCode,
  ValidationErrorCode,
} from "@/shared/types/results";
import { applyCacheBehavior } from "@/shared/utils/applyCache";
import { getFirstZodError } from "@/shared/utils/getFirstZodError";
import {
  createErrorResult,
  createSuccessResult,
  IResult,
} from "@/shared/utils/resultPattern";
import { updateTag } from "next/cache";
import { projectsRepository } from "../../data/projects.repository.factory";
import { ProjectEvents } from "../../domain/events/catalog";
import { Project } from "../../domain/types/project";
import { CreateProjectErrorCode } from "../../domain/types/results";
import { createProjectSchema } from "../schemas/createProject.schema";
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

export type CreateProjectActionErrorCode =
  | CreateProjectErrorCode
  | ValidationErrorCode
  | UnauthorizedErrorCode;

export const createProject = async (data: {
  name: string;
  color?: string;
}): Promise<
  IResult<
    { project: Project; isFirstProject: boolean },
    CreateProjectActionErrorCode
  >
> => {
  const parsedData = createProjectSchema.safeParse(data);
  if (!parsedData.success) {
    const firstError = getFirstZodError(parsedData.error);
    logger.error(
      {
        event: ProjectEvents.validationFail,
        input: data,
        error: firstError,
      },
      "Project validation failed"
    );
    return createErrorResult("VALIDATION_ERROR", firstError ?? "");
  }

  const currentUser = await getCurrentUser();

  const createProjectResponse = await projectsUseCases.createProject({
    repo: projectsRepository,
    data: {
      ...parsedData.data,
      userId: currentUser.id,
    },
  });

  const countProjectsResponse = await projectsUseCases.countUserProjects({
    repo: projectsRepository,
    userId: currentUser.id,
  });

  if (createProjectResponse.error) {
    logger.error(
      {
        event: ProjectEvents.createFail,
        userId: currentUser.id,
        error: createProjectResponse.error.message,
        input: parsedData.data,
      },
      "Failed to create project"
    );
    return createErrorResult(
      createProjectResponse.error.code,
      createProjectResponse.error.message
    );
  }

  if (countProjectsResponse.error) {
    return createErrorResult(
      countProjectsResponse.error.code,
      countProjectsResponse.error.message
    );
  }

  logger.info(
    {
      event: ProjectEvents.created,
      userId: currentUser.id,
      projectId: createProjectResponse.result.id,
      projectName: createProjectResponse.result.name,
      isFirstProject: countProjectsResponse.result === 1,
    },
    "Project created successfully"
  );

  updateTag(`projects-list-${currentUser.id}`);
  return createSuccessResult({
    project: createProjectResponse.result,
    isFirstProject: countProjectsResponse.result === 1,
  });
};
