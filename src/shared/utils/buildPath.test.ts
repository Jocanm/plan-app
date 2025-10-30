import { describe, expect, it } from "vitest";
import { buildPath } from "./buildPath";

describe("Build Path - utils", () => {
  it("Should replace the path with the provided param", () => {
    const PATH = "/dashboard/:projectId";
    const PROJECT_ID = "test-id";

    const finalPath = buildPath(PATH, { projectId: PROJECT_ID });

    expect(finalPath).toBe(`/dashboard/${PROJECT_ID}`);
  });

  it("Should replace path with all params provider", () => {
    const PATH = "/dashboard/:projectId/:userId/:taskId";
    const PROJECT_ID = "test-id";
    const USER_ID = "user-id";
    const TASK_ID = "task-id";

    const finalPath = buildPath(PATH, {
      taskId: TASK_ID,
      userId: USER_ID,
      projectId: PROJECT_ID,
    });

    expect(finalPath).toBe(`/dashboard/${PROJECT_ID}/${USER_ID}/${TASK_ID}`);
  });

  it("Should replace multiple coincidences", () => {
    const path = "/test/:userId/:userId";
    const userId = "123";

    const finalPath = buildPath(path, { userId });

    expect(finalPath).toBe("/test/123/123");
  });

  it("Should not change path if params doesn't match", () => {
    const PATH = "/dashboard/:projectId";
    const PROJECT_ID = "test-id";

    const finalPath = buildPath(PATH, { project_id: PROJECT_ID });

    expect(finalPath).toBe(PATH);
  });

  it("Should not change path if no params were provider", () => {
    const PATH = "/dashboard/:projectId";

    const finalPath = buildPath(PATH);

    expect(finalPath).toBe(PATH);
  });

  it("Should ignore params not in the path", () => {
    const finalPath = buildPath("/dashboard/:projectId", {
      projectId: "test-id",
      userId: "ignored",
    });

    expect(finalPath).toBe("/dashboard/test-id");
  });
});
