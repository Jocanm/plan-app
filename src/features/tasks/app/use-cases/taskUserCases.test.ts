// theses tests are TDD first, use cases should follow result pattern and use fake repo managers. for the moment only create task use case is done
import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { FakeTasksRepositoryManager } from "../../data/tasks.repository.fake";
import { DEFAULT_TASK_COLOR } from "../../domain/constants";
import { Task } from "../../domain/types/task";
import { taskUseCases } from "./taskUseCases";

describe("Tasks - use cases", () => {
  const repoManager = FakeTasksRepositoryManager.getInstance();

  beforeEach(() => {
    repoManager.reset();
  });

  afterAll(() => {
    repoManager.reset();
  });

  describe("Create task", () => {
    it("creates a task for the specified user", async () => {
      const repo = repoManager.getRepository();

      const { result } = await taskUseCases.createTask({
        repo,
        data: {
          title: "New Task",
          userId: "user-1",
        },
      });

      expect(result).toEqual<Task>({
        id: expect.any(String),
        title: "New Task",
        description: undefined,
        projectId: undefined,
        userId: "user-1",
        color: DEFAULT_TASK_COLOR,
      });
    });

    it("Should handle unexpected errors", async () => {
      const repo = repoManager
        .withOverride("createTask", () => {
          throw new Error();
        })
        .getRepository();

      const { error } = await taskUseCases.createTask({
        repo,
        data: {
          title: "New Task",
          userId: "user-1",
        },
      });

      expect(error).toBeDefined();
    });

    it("creates a task with all optional fields", async () => {
      const repo = repoManager.getRepository();

      const { result } = await taskUseCases.createTask({
        repo,
        data: {
          title: "New Task",
          description: "This is a new task",
          projectId: "project-1",
          userId: "user-1",
          color: "#00FF00",
        },
      });

      expect(result).toEqual<Task>({
        id: expect.any(String),
        title: "New Task",
        description: "This is a new task",
        projectId: "project-1",
        userId: "user-1",
        color: "#00FF00",
      });
    });
  });
});
