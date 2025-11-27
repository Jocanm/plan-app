import { handleCatchError } from "@/shared/utils/errors/handleCatchError";
import { createSuccessResult } from "@/shared/utils/resultPattern";
import { buildCreateProjectData } from "../../domain/factories";
import { CreateProjectInput } from "../../domain/types/project";
import { IProjectRepository } from "../../domain/types/repository";
import {
  CountUserProjectsResult,
  CreateProjectResult,
  GetProjectDetailsResult,
  GetProjectsForSidebarResult,
} from "../../domain/types/results";

interface ProjectUseCaseProps {
  repo: IProjectRepository;
}

interface GetProjectsForSidebarProps extends ProjectUseCaseProps {
  userId: string;
}

const getProjectsForSidebar = async ({
  repo,
  userId,
}: GetProjectsForSidebarProps): Promise<GetProjectsForSidebarResult> => {
  try {
    const projects = await repo.getProjectsForSidebar(userId);
    return createSuccessResult(projects);
  } catch (error) {
    return handleCatchError(error);
  }
};

interface GetProjectDetailsProps extends ProjectUseCaseProps {
  userId: string;
  projectId: string;
}

const getProjectDetails = async ({
  repo,
  userId,
  projectId,
}: GetProjectDetailsProps): Promise<GetProjectDetailsResult> => {
  try {
    const project = await repo.getProjectDetails(projectId, userId);
    return createSuccessResult(project);
  } catch (error) {
    return handleCatchError(error);
  }
};

interface CreateProjectProps extends ProjectUseCaseProps {
  data: CreateProjectInput;
}

const createProject = async ({
  repo,
  data,
}: CreateProjectProps): Promise<CreateProjectResult> => {
  const projectData = buildCreateProjectData(data);
  try {
    const project = await repo.createProject(projectData);
    return createSuccessResult(project);
  } catch (error) {
    return handleCatchError(error);
  }
};

interface CountUserProjectsProps extends ProjectUseCaseProps {
  userId: string;
}

const countUserProjects = async ({
  repo,
  userId,
}: CountUserProjectsProps): Promise<CountUserProjectsResult> => {
  try {
    const userProjectsCount = await repo.countByUser(userId);
    return createSuccessResult(userProjectsCount);
  } catch (error) {
    return handleCatchError(error);
  }
};

export const projectsUseCases = {
  createProject,
  countUserProjects,
  getProjectDetails,
  getProjectsForSidebar,
};
