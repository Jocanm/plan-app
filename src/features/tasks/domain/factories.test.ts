import { describe, expect, it } from "vitest";
import { DEFAULT_TASK_COLOR } from "./constants";
import { buildCreateTaskData } from "./factories";
import { CreateTaskInput } from "./types/task";

describe("Task - factories", () => {
  describe("Build createTaskData", () => {
    it("Should create valid data with min values", () => {
      const input: CreateTaskInput = {
        title: "Task",
        userId: "default-user",
        projectId: "default-project",
      };

      const data = buildCreateTaskData(input);

      expect(data).toEqual({
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

      expect(data).toEqual({
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
  });
});
