import { DateRange, IProjectRepository } from "../../data/projects.repository";

type GetProjectsForSidebar = {
  userId: string;
  dateRange: DateRange;
  repo: IProjectRepository;
};

const getProjectsForSidebar = async ({
  repo,
  userId,
  dateRange,
}: GetProjectsForSidebar) => {
  return await repo.getProjectsForSidebar(userId, dateRange);
};

export const projectsUseCases = {
  getProjectsForSidebar,
};
