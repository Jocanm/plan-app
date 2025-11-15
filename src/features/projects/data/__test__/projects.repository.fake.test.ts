import { beforeEach, describe, expect, it } from "vitest";
import { FakeProjectsRepositoryManager } from "../projects.repository.fake";

describe("Projects Repository fake", () => {
  beforeEach(() => {
    FakeProjectsRepositoryManager.getInstance().reset();
  });

  it("FakeProjectsRepositoryManager is singleton", () => {
    const instance1 = FakeProjectsRepositoryManager.getInstance();
    const instance2 = FakeProjectsRepositoryManager.getInstance();

    expect(instance1).toBe(instance2);
  });

  it("FakeProjectsRepositoryManager seed should populate the projects", async () => {
    const manager = FakeProjectsRepositoryManager.getInstance();
    const repo = manager.getRepository();

    manager.seed([
      { userId: "default-user" },
      { userId: "default-user" },
      { userId: "other-user" },
    ]);

    const results = await repo.getProjectsForSidebar("default-user");
    expect(results).toHaveLength(2);
  });

  it("FakeProjectsRepositoryManager should be able to create internal projects", async () => {
    const manager = FakeProjectsRepositoryManager.getInstance();
    const repo = manager.getRepository();
    manager.reset();

    const projectId = crypto.randomUUID();
    await repo.createProject({
      id: projectId,
      color: "#FFFF",
      name: "new project",
      userId: "default-user",
    });

    const allProjects = await repo.getProjectsForSidebar("default-user");
    const firstProject = allProjects.at(0);

    expect(allProjects).toHaveLength(1);
    expect(firstProject).not.toBeUndefined();
    expect(firstProject?.id).toBe(projectId);
  });

  it("Reset method should clear all projects", async () => {
    const manager = FakeProjectsRepositoryManager.getInstance();
    const repo = manager.getRepository();
    manager.seed([{ name: "test project 1" }]);
    manager.reset();

    const results = await repo.getProjectsForSidebar("default-user");

    expect(results).toHaveLength(0);
  });

  it("countByUser returns number of user projects", async () => {
    const manager = FakeProjectsRepositoryManager.getInstance();
    const repo = manager.getRepository();

    await repo.createProject({
      id: "projectId",
      color: "#FFFF",
      name: "new project",
      userId: "default-user",
    });
    await repo.createProject({
      id: "projectId",
      color: "#FFFF",
      name: "new project",
      userId: "default-user",
    });

    const count = await repo.countByUser("default-user");
    expect(count).toBe(2);
  });
});
