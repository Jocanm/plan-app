import { describe, expect, it, vi } from "vitest";
import { IProjectRepository } from "../../domain/types/repository";
import { projectsUseCases } from "./projectsUseCases";

const createProjectsRepoStub = (methods: Partial<IProjectRepository>) => {
  const projectsRepoStub = {
    ...methods,
  };

  return projectsRepoStub as unknown as IProjectRepository;
};

describe("Projects - use cases", () => {
  describe("Get projects for sidebar", () => {
    it("Should call the repo with proper params", async () => {
      const repoStub = createProjectsRepoStub({
        getProjectsForSidebar: vi.fn(),
      });

      await projectsUseCases.getProjectsForSidebar({
        repo: repoStub,
        userId: "userID",
      });

      expect(repoStub.getProjectsForSidebar).toHaveBeenCalledWith("userID");
    });

    it("Should return the projects from repository", async () => {
      const mockProjects = [
        { id: "1", name: "Work", color: "#FF0000", totalPendingTasks: 5 },
      ];

      const repoStub = createProjectsRepoStub({
        getProjectsForSidebar: vi.fn().mockResolvedValue(mockProjects),
      });

      const result = await projectsUseCases.getProjectsForSidebar({
        repo: repoStub,
        userId: "userID",
      });

      expect(result).toEqual(mockProjects);
    });
  });

  describe("Get project details", () => {
    const userId = "user-id";
    const projectId = "project-id";

    it("Should call the method with proper params", async () => {
      const repoStub = createProjectsRepoStub({
        getProjectDetails: vi.fn(),
      });

      await projectsUseCases.getProjectDetails({
        userId,
        projectId,
        repo: repoStub,
      });

      expect(repoStub.getProjectDetails).toHaveBeenCalledTimes(1);
      expect(repoStub.getProjectDetails).toHaveBeenCalledWith(
        projectId,
        userId
      );
    });

    it("Should return the project detail", async () => {
      const mockProject = { id: projectId, userId, name: "project" };

      const repoStub = createProjectsRepoStub({
        getProjectDetails: vi.fn().mockResolvedValue(mockProject),
      });

      const result = await projectsUseCases.getProjectDetails({
        userId,
        projectId,
        repo: repoStub,
      });

      expect(result).toBe(mockProject);
    });
  });
});
