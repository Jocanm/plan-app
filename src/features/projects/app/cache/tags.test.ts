import { describe, expect, it } from "vitest";
import { projectsTags } from "./tags";

describe("Projects - Cache Tags", () => {
  describe("byId", () => {
    it("should concatenate projectId correctly", () => {
      const result = projectsTags.byId("project-123");

      expect(result).toBe("project-project-123");
    });
  });

  describe("byUser", () => {
    it("should concatenate userId correctly", () => {
      const result = projectsTags.byUser("user-abc");

      expect(result).toBe("projects-list-user-abc");
    });
  });
});
