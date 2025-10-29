import { Project, ProjectSidebar } from "./project";

export interface IProjectRepository {
  getProjectsForSidebar: (userId: string) => Promise<ProjectSidebar[]>;
  getProjectDetails: (
    projectId: string,
    userId: string
  ) => Promise<Project | null>;
}
