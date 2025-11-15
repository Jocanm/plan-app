import {
  CreateProjectData,
  Project,
  ProjectDetail,
  ProjectSidebar,
} from "./project";

export interface IProjectRepository {
  getProjectsForSidebar: (userId: string) => Promise<ProjectSidebar[]>;

  getProjectDetails: (
    projectId: string,
    userId: string
  ) => Promise<ProjectDetail | null>;

  createProject: (data: CreateProjectData) => Promise<Project>;
  countByUser: (userId: string) => Promise<number>;
}
