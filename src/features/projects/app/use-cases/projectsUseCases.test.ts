import { describe, expect, it, vi } from "vitest";
import { IProjectRepository } from "../../data/projects.repository";
import { projectsUseCases } from "./projectsUseCases";

describe("Projects - use cases", () => {
  describe("Projects - Get projects for sidebar", () => {
    it("Should call the repo with proper params", async () => {
      const repoStub: IProjectRepository = {
        getProjectsForSidebar: vi.fn(),
      };

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

      const repoStub: IProjectRepository = {
        getProjectsForSidebar: vi.fn().mockResolvedValue(mockProjects),
      };

      const result = await projectsUseCases.getProjectsForSidebar({
        repo: repoStub,
        userId: "userID",
      });

      expect(result).toEqual(mockProjects);
    });
  });
});
