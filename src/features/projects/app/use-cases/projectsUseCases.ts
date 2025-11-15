import {
  createErrorResult,
  createSuccessResult,
} from "@/shared/utils/resultPattern";
import { buildCreateProjectData } from "../../domain/factories";
import { CreateProjectInput } from "../../domain/types/project";
import { IProjectRepository } from "../../domain/types/repository";
import {
  CountUserProjectsResult,
  CreateProjectResult,
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
}: GetProjectsForSidebarProps) => {
  return await repo.getProjectsForSidebar(userId);
};

interface GetProjectDetailsProps extends ProjectUseCaseProps {
  userId: string;
  projectId: string;
}

const getProjectDetails = async ({
  repo,
  userId,
  projectId,
}: GetProjectDetailsProps) => {
  return await repo.getProjectDetails(projectId, userId);
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
  } catch {
    return createErrorResult(
      "UNKNOWN_ERROR",
      "something went wrong creating project"
    );
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
  } catch {
    return createErrorResult(
      "UNKNOWN_ERROR",
      "something went wrong counting projects"
    );
  }
};

export const projectsUseCases = {
  createProject,
  countUserProjects,
  getProjectDetails,
  getProjectsForSidebar,
};
