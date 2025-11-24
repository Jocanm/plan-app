import { describe, expect, it } from "vitest";
import { DEFAULT_TASK_COLOR } from "./constants";
import { buildCreateTaskData, buildOptimisticTask } from "./factories";
import {
  CreateOptimisticTaskInput,
  CreateTaskData,
  CreateTaskInput,
} from "./types/task";

describe("Task - factories", () => {
  describe("Build createTaskData", () => {
    it("Should create valid data with min values", () => {
      const input: CreateTaskInput = {
        title: "Task",
        userId: "default-user",
        projectId: "default-project",
      };

      const data = buildCreateTaskData(input);

      expect(data).toEqual<CreateTaskData>({
        id: expect.any(String),
        color: DEFAULT_TASK_COLOR,
        title: "Task",
        description: undefined,
        userId: "default-user",
        projectId: "default-project",
      });
    });

    it("Should create valid data with all values", () => {
      const input: CreateTaskInput = {
        title: "Task",
        description: "Task description",
        color: "#FFF",
        userId: "default-user",
        projectId: "default-project",
      };

      const data = buildCreateTaskData(input);

      expect(data).toEqual<CreateTaskData>({
        id: expect.any(String),
        color: "#FFF",
        title: "Task",
        description: "Task description",
        userId: "default-user",
        projectId: "default-project",
      });
    });

    it("Should create different IDs for each call", () => {
      const input: CreateTaskInput = {
        title: "Task",
        userId: "default-user",
        projectId: "default-project",
      };

      const data1 = buildCreateTaskData(input);
      const data2 = buildCreateTaskData(input);

      expect(data1.id).not.toBe(data2.id);
    });

    it("Should override with custom ID if provided", () => {
      const customId = "custom-id-123";
      const input: CreateTaskInput = {
        id: customId,
        title: "Task",
        userId: "default-user",
        projectId: "default-project",
      };

      const data = buildCreateTaskData(input);

      expect(data.id).toBe(customId);
    });
  });

  describe("Build optimistic task", () => {
    it("Should build optimistic task with correct properties", () => {
      const input: CreateOptimisticTaskInput = {
        id: "task-id-123",
        title: "Optimistic Task",
        description: "This is an optimistic task",
        color: "#ABCDEF",
        userId: "user-123",
        projectId: "project-123",
      };

      const optimisticTask = buildOptimisticTask(input);

      expect(optimisticTask).toEqual({
        ...input,
        isOptimistic: true,
      });
    });

    it("Should build optimistic task with default color if not provided", () => {
      const input: CreateOptimisticTaskInput = {
        id: "task-id-456",
        title: "Another Optimistic Task",
        userId: "user-456",
        projectId: "project-456",
      };

      const optimisticTask = buildOptimisticTask(input);

      expect(optimisticTask).toEqual({
        ...input,
        color: DEFAULT_TASK_COLOR,
        isOptimistic: true,
      });
    });
  });
});
