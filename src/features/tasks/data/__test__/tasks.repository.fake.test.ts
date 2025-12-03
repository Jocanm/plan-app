import { generateId } from "@/lib/utils/id";
import { beforeEach, describe, expect, it } from "vitest";
import { FakeTasksRepositoryManager } from "../tasks.repository.fake";

describe("Tasks Repository fake", () => {
  beforeEach(() => {
    FakeTasksRepositoryManager.getInstance().reset();
  });

  it("FakeTasksRepositoryManager is singleton", () => {
    const instance1 = FakeTasksRepositoryManager.getInstance();
    const instance2 = FakeTasksRepositoryManager.getInstance();

    expect(instance1).toBe(instance2);
  });

  it("FakeTasksRepositoryManager should be able to create internal tasks", async () => {
    const manager = FakeTasksRepositoryManager.getInstance();
    const repo = manager.getRepository();
    manager.reset();

    const taskId = generateId();
    await repo.createTask({
      id: taskId,
      color: "#FFFF",
      title: "new task",
      userId: "default-user",
      projectId: "default-project",
    });

    const allTasks = manager["tasks"];
    const firstTask = allTasks.at(0);

    expect(allTasks).toHaveLength(1);
    expect(firstTask).not.toBeUndefined();
    expect(firstTask?.id).toBe(taskId);
  });
});
