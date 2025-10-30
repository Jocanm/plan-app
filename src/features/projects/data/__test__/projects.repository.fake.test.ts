import { beforeEach, describe, expect, it } from "vitest";
import {
  FakeProjectsRepositoryManager,
  SEED_PROJECTS,
} from "../projects.repository.fake";

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

    manager.seed(SEED_PROJECTS);

    const results = await repo.getProjectsForSidebar("user-id");
    expect(results).toHaveLength(2);
  });

  it("Reset method should clear all projects", async () => {
    const manager = FakeProjectsRepositoryManager.getInstance();
    const repo = manager.getRepository();
    manager.seed(SEED_PROJECTS);
    manager.reset();

    const results = await repo.getProjectsForSidebar("user-id");

    expect(results).toHaveLength(0);
  });
});
