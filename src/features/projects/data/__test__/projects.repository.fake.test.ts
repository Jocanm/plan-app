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

  it("Reset method should clear all projects", async () => {
    const manager = FakeProjectsRepositoryManager.getInstance();
    const repo = manager.getRepository();
    manager.seed([{ name: "test project 1" }]);
    manager.reset();

    const results = await repo.getProjectsForSidebar("default-user");

    expect(results).toHaveLength(0);
  });
});
