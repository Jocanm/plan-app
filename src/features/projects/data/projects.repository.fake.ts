import { Project } from "../domain/types/project";
import { IProjectRepository } from "../domain/types/repository";

declare global {
  var __fakeProjectsRepo: FakeProjectsRepositoryManager | undefined;
}

const DEFAULT_PROJECT = {
  name: "Test Project",
  color: "#000000",
  userId: "default-user",
  createdAt: new Date(),
  updatedAt: new Date(),
} satisfies Partial<Project>;

const makeProject = (overrides: Partial<Project> = {}): Project => ({
  ...DEFAULT_PROJECT,
  id: crypto.randomUUID(),
  ...overrides,
});

export class FakeProjectsRepositoryManager {
  private projects: Project[] = [];

  private constructor() {}

  static getInstance() {
    if (!global.__fakeProjectsRepo) {
      global.__fakeProjectsRepo = new FakeProjectsRepositoryManager();
    }
    return global.__fakeProjectsRepo;
  }

  reset(): FakeProjectsRepositoryManager {
    this.projects = [];
    return this;
  }

  seed(projects: Partial<Project>[]): FakeProjectsRepositoryManager {
    this.projects = projects.map(makeProject);
    return this;
  }

  addProject(project: Partial<Project>): FakeProjectsRepositoryManager {
    this.projects.push(makeProject(project));
    return this;
  }

  getRepository(): IProjectRepository {
    return {
      getProjectDetails: async (projectId, userId) => {
        const project = this.projects.find(el => {
          return el.id === projectId && el.userId === userId;
        });

        if (!project) return null;

        return {
          ...project,
          tasks: [],
        };
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

      createProject: async data => {
        const project = makeProject(data);
        this.addProject(project);
        return project;
      },

      countByUser: async userId => {
        const userProjects = this.projects.filter(el => el.userId === userId);
        return userProjects.length;
      },
    };
  }
}

export const createFakeProjectsRepository = (): IProjectRepository => {
  return FakeProjectsRepositoryManager.getInstance().getRepository();
};
