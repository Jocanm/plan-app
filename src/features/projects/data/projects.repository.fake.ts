import { Project } from "../domain/types/project";
import { IProjectRepository } from "../domain/types/repository";

export const SEED_PROJECTS: Project[] = [
  {
    id: "project-1",
    name: "Personal",
    color: "#FF6B6B",
    userId: "user-id",
    createdAt: new Date("2025-01-01"),
    updatedAt: new Date("2025-01-01"),
    tasks: [],
  },
  {
    id: "project-2",
    name: "Work",
    color: "#FE2",
    userId: "user-id",
    createdAt: new Date("2025-01-01"),
    updatedAt: new Date("2025-01-01"),
    tasks: [],
  },
];

export class FakeProjectsRepositoryManager {
  private projects: Project[] = [];
  private static instance: FakeProjectsRepositoryManager;

  private constructor() {}

  static getInstance(): FakeProjectsRepositoryManager {
    if (!FakeProjectsRepositoryManager.instance) {
      FakeProjectsRepositoryManager.instance =
        new FakeProjectsRepositoryManager();
    }

    return FakeProjectsRepositoryManager.instance;
  }

  reset(): FakeProjectsRepositoryManager {
    this.projects = [];
    return this;
  }

  seed(projects: Project[]): FakeProjectsRepositoryManager {
    this.projects = [...projects];
    return this;
  }

  getRepository(): IProjectRepository {
    return {
      getProjectDetails: async (projectId, userId) => {
        const project = this.projects.find(el => {
          return el.id === projectId && el.userId === userId;
        });

        return project ?? null;
      },
      getProjectsForSidebar: async userId => {
        const userProjects = this.projects.filter(el => el.userId === userId);
        return userProjects.map(el => ({
          id: el.id,
          name: el.name,
          color: el.color,
          totalPendingTasks: 0,
        }));
      },
    };
  }
}

export const createFakeProjectsRepository = (): IProjectRepository => {
  return FakeProjectsRepositoryManager.getInstance().getRepository();
};
