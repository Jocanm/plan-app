import { beforeEach, describe, expect, it } from "vitest";
import { FakeProjectsRepositoryManager } from "../../data/projects.repository.fake";
import { DEFAULT_PROJECT_COLOR } from "../../domain/constants";
import { Project } from "../../domain/types/project";
import { projectsUseCases } from "./projectsUseCases";

describe("Projects - use cases", () => {
  const repoManager = FakeProjectsRepositoryManager.getInstance();

  beforeEach(() => {
    repoManager.reset();
  });

  describe("Get projects for sidebar", () => {
    it("returns only projects for the specified user", async () => {
      const repo = repoManager
        .seed([
          { name: "Work", userId: "user-1" },
          { name: "Personal", userId: "user-2" },
        ])
        .getRepository();

      const result = await projectsUseCases.getProjectsForSidebar({
        repo,
        userId: "user-1",
      });

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe("Work");
    });

    it("returns correct shape with totalPendingTasks", async () => {
      const repo = repoManager
        .seed([{ name: "Work", color: "#FF0000" }])
        .getRepository();

      const result = await projectsUseCases.getProjectsForSidebar({
        repo,
        userId: "default-user",
      });

      expect(result[0]).toEqual({
        name: "Work",
        color: "#FF0000",
        totalPendingTasks: 0,
        id: expect.any(String),
      });
    });
  });

  describe("Get project details", () => {
    const userId = "default-user";
    const projectId = "project-id";

    it("Should return the correct project", async () => {
      const mockProject: Partial<Project> = {
        userId,
        id: projectId,
        name: "project-1",
      };
      const repo = repoManager.seed([mockProject]).getRepository();

      const result = await projectsUseCases.getProjectDetails({
        repo,
        userId,
        projectId,
      });

      expect(result?.id).toBe(mockProject.id);
    });

    it("Should return null if project is not found", async () => {
      const repo = repoManager
        .seed([{ name: "project-1", id: projectId, userId }])
        .getRepository();

      const result = await repo.getProjectDetails(projectId, "other-user-id");

      expect(result).toBeNull();
    });
  });

  describe("Create Project", () => {
    it("Should allow user to create a project with a default color", async () => {
      const repo = repoManager.getRepository();

      const response = await projectsUseCases.createProject({
        repo,
        data: {
          name: "Project A",
          userId: "default-user",
        },
      });

      expect(response.result).toEqual({
        id: expect.any(String),
        name: "Project A",
        userId: "default-user",
        color: DEFAULT_PROJECT_COLOR,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });

    it("Should allow user to provide custom color", async () => {
      const repo = repoManager.getRepository();

      const response = await projectsUseCases.createProject({
        repo,
        data: {
          name: "Project A",
          userId: "default-user",
          color: "#ddd",
        },
      });

      expect(response.result?.color).toBe("#ddd");
    });

    it("retorna error cuando el repositorio falla", async () => {
      const repo = repoManager
        .withOverride("createProject", () => {
          throw new Error("DB error");
        })
        .getRepository();

      const result = await projectsUseCases.createProject({
        repo,
        data: {
          name: "Project A",
          userId: "default-user",
        },
      });

      expect(result.error?.code).toBe("UNKNOWN_ERROR");
      expect(result.result).toBeUndefined();
    });
  });

  describe("Count projects", () => {
    it("countUserProjects returns count from repository", async () => {
      const repo = repoManager
        .seed([{ userId: "1" }, { userId: "1" }, { userId: "2" }])
        .getRepository();
      const response = await projectsUseCases.countUserProjects({
        repo,
        userId: "1",
      });
      expect(response.result).toBe(2);
    });

    it("Should handle unexpected error", async () => {
      const repo = repoManager
        .withOverride("countByUser", () => {
          throw new Error("DB error");
        })
        .getRepository();

      const response = await projectsUseCases.countUserProjects({
        repo,
        userId: "default-user",
      });

      expect(response.error).not.toBeUndefined();
      expect(response.error?.code).toBe("UNKNOWN_ERROR");
    });
  });
});
