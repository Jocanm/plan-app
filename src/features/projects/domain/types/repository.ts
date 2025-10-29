import { ProjectSidebar } from "./project";

export interface IProjectRepository {
  getProjectsForSidebar: (userId: string) => Promise<ProjectSidebar[]>;
}
