import { Project, ProjectSidebar } from "../domain/types/project";
import { IProjectRepository } from "../domain/types/repository";

const SEED_PROJECTS: Project[] = [
  {
    id: "project-1",
    name: "Personal",
    color: "#FF6B6B",
    userId: "user-id",
    createdAt: new Date("2025-01-01"),
    updatedAt: new Date("2025-01-01"),
  },
  {
    id: "project-2",
    name: "Work",
    color: "#FE2",
    userId: "user-id",
    createdAt: new Date("2025-01-01"),
    updatedAt: new Date("2025-01-01"),
  },
];

export function createFakeProjectsRepository(
  defaultProjects = SEED_PROJECTS
): IProjectRepository {
  const projects = defaultProjects;

  return {
    async getProjectsForSidebar(userId: string): Promise<ProjectSidebar[]> {
      const userProjects = projects.filter(el => el.userId === userId);
      return userProjects.map(el => ({
        id: el.id,
        name: el.name,
        color: el.color,
        totalPendingTasks: 0,
      }));
    },

    async getProjectDetails() {
      return null;
    },
  };
}
