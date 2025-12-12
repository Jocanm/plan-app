import { describe, expect, it } from "vitest";
import {
  validateCalendarEventDateRange,
  validateUpdateCalendarEventInput,
} from "./validations";

describe("Validations - Calendar Event", () => {
  describe("validateCalendarEventDateRange", () => {
    it("End date should be after start date", () => {
      const startTime = new Date("2024-06-10T10:00:00Z");
      const endTime = new Date("2024-06-10T09:00:00Z");

      const response = validateCalendarEventDateRange(startTime, endTime);

      expect(response.result).toBeUndefined();
      expect(response.error?.code).toBe("END_BEFORE_START");
    });

    it("Start date and end date should not be the same", () => {
      const startTime = new Date("2024-06-10T10:00:00Z");
      const endTime = new Date("2024-06-10T10:00:00Z");

      const response = validateCalendarEventDateRange(startTime, endTime);

      expect(response.result).toBeUndefined();
      expect(response.error?.code).toBe("SAME_START_END");
    });

    it("Valid date range should pass validation", () => {
      const startTime = new Date("2024-06-10T10:00:00Z");
      const endTime = new Date("2024-06-10T11:00:00Z");

      const response = validateCalendarEventDateRange(startTime, endTime);

      expect(response.result).toBe(true);
      expect(response.error).toBeUndefined();
    });
  });

  describe("validateUpdateCalendarEventInput", () => {
    it("should return error if no fields are provided", () => {
      const response = validateUpdateCalendarEventInput({
        id: "event-1",
        date: new Date("2025-01-15"),
      });

      expect(response.result).toBeUndefined();
      expect(response.error?.code).toBe("NO_CHANGES_PROVIDED");
      expect(response.error?.message).toBe(
        "At least one of startTime or endTime must be provided"
      );
    });

    it("should pass validation if startTime is provided", () => {
      const response = validateUpdateCalendarEventInput({
        id: "event-1",
        date: new Date("2025-01-15"),
        startTime: new Date(),
      });

      expect(response.result).toBe(true);
      expect(response.error).toBeUndefined();
    });

    it("should pass validation if endTime is provided", () => {
      const response = validateUpdateCalendarEventInput({
        id: "event-1",
        date: new Date("2025-01-15"),
        endTime: new Date(),
      });

      expect(response.result).toBe(true);
      expect(response.error).toBeUndefined();
    });

    it("should pass validation if both fields are provided", () => {
      const response = validateUpdateCalendarEventInput({
        id: "event-1",
        date: new Date("2025-01-15"),
        startTime: new Date(),
        endTime: new Date(),
      });

      expect(response.result).toBe(true);
      expect(response.error).toBeUndefined();
    });
  });
});
