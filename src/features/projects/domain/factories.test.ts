import { describe, expect, it } from "vitest";
import { DEFAULT_PROJECT_COLOR } from "./constants";
import { buildCreateProjectData } from "./factories";

describe("Projects - Factories", () => {
  describe("buildCreateProjectData", () => {
    it("Should create valid data with minimum values", () => {
      const data = buildCreateProjectData({
        name: "Project",
        userId: "default-user",
      });

      expect(data).toEqual({
        id: expect.any(String),
        name: "Project",
        userId: "default-user",
        color: DEFAULT_PROJECT_COLOR,
      });
    });

    it("Should allow user to provide custom project color", () => {
      const data = buildCreateProjectData({
        name: "Project",
        userId: "default-user",
        color: "#fff",
      });

      expect(data.color).toBe("#fff");
    });

    it("Should allow to provide custom id", () => {
      const data = buildCreateProjectData({
        name: "Project",
        userId: "default-user",
        id: "custom-project-id",
      });

      expect(data.id).toBe("custom-project-id");
    });

    it("Should generate unique IDs", () => {
      const data1 = buildCreateProjectData({ name: "A", userId: "1" });
      const data2 = buildCreateProjectData({ name: "B", userId: "1" });

      expect(data1.id).not.toBe(data2.id);
    });
  });
});
