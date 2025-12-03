import { generateId } from "@/lib/utils/id";
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
  id: generateId(),
  ...overrides,
});

export class FakeProjectsRepositoryManager {
  private projects: Project[] = [];
  public overrides: Partial<IProjectRepository> = {};

  private constructor() {}

  static getInstance() {
    if (!global.__fakeProjectsRepo) {
      global.__fakeProjectsRepo = new FakeProjectsRepositoryManager();
    }
    return global.__fakeProjectsRepo;
  }

  reset(): FakeProjectsRepositoryManager {
    this.projects = [];
    this.overrides = {};
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

  withOverride<K extends keyof IProjectRepository>(
    method: K,
    implementation: IProjectRepository[K]
  ): FakeProjectsRepositoryManager {
    this.overrides[method] = implementation;
    return this;
  }

  getRepository(): IProjectRepository {
    return {
      getProjectDetails: async (projectId, userId) => {
        if (this.overrides.getProjectDetails) {
          return this.overrides.getProjectDetails(projectId, userId);
        }

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
        if (this.overrides.getProjectsForSidebar) {
          return this.overrides.getProjectsForSidebar(userId);
        }

        const userProjects = this.projects.filter(el => el.userId === userId);
        return userProjects.map(el => ({
          id: el.id,
          name: el.name,
          color: el.color,
          totalPendingTasks: 0,
        }));
      },

      createProject: async data => {
        if (this.overrides.createProject) {
          return this.overrides.createProject(data);
        }

        const project = makeProject(data);
        this.addProject(project);
        return project;
      },

      countByUser: async userId => {
        if (this.overrides.countByUser) {
          return this.overrides.countByUser(userId);
        }

        const userProjects = this.projects.filter(el => el.userId === userId);
        return userProjects.length;
      },
    };
  }
}

export const createFakeProjectsRepository = (): IProjectRepository => {
  return FakeProjectsRepositoryManager.getInstance().getRepository();
};
