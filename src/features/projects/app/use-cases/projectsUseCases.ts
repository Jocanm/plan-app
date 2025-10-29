import { IProjectRepository } from "../../domain/types/repository";

type GetProjectsForSidebar = {
  userId: string;
  repo: IProjectRepository;
};

const getProjectsForSidebar = async ({
  repo,
  userId,
}: GetProjectsForSidebar) => {
  return await repo.getProjectsForSidebar(userId);
};

export const projectsUseCases = {
  getProjectsForSidebar,
};
