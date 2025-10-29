import { IProjectRepository } from "../../domain/types/repository";

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

export const projectsUseCases = {
  getProjectDetails,
  getProjectsForSidebar,
};
