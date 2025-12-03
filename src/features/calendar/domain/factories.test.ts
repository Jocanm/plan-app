import { add } from "date-fns";
import { describe, expect, it } from "vitest";
import { MIN_CALENDAR_EVENT_DURATION_MINUTES } from "./constants";
import {
  buildCalendarEndTime,
  buildCreateCalendarEventData,
} from "./factories";

describe("Calendar event - Factories", () => {
  describe("buildCreateCalendarEventData", () => {
    it("should build CreateCalendarEventData correctly", () => {
      const date = new Date("2024-07-01T00:00:00.000Z");
      const startTime = new Date("2024-07-01T10:00:00Z");
      const endTime = new Date("2024-07-01T11:00:00Z");

      const input = {
        taskId: "task-123",
        userId: "user-456",
        date,
        startTime,
        endTime,
      };

      const result = buildCreateCalendarEventData(input);

      expect(result).toEqual({
        taskId: "task-123",
        userId: "user-456",
        date,
        startTime,
        endTime,
      });
    });

    it("Should add default minutes to endTime when not provided", () => {
      const date = new Date("2024-07-01T00:00:00.000Z");
      const startTime = new Date("2024-07-01T10:00:00Z");

      const input = {
        taskId: "task-123",
        userId: "user-456",
        date,
        startTime,
      };

      const result = buildCreateCalendarEventData(input);

      expect(result).toEqual({
        taskId: "task-123",
        userId: "user-456",
        date,
        startTime,
        endTime: add(startTime, {
          minutes: MIN_CALENDAR_EVENT_DURATION_MINUTES,
        }),
      });
    });

    it("Should include id when provided", () => {
      const date = new Date("2024-07-01T00:00:00.000Z");
      const startTime = new Date("2024-07-01T10:00:00Z");
      const endTime = new Date("2024-07-01T11:00:00Z");

      const input = {
        id: "event-789",
        taskId: "task-123",
        userId: "user-456",
        date,
        startTime,
        endTime,
      };

      const result = buildCreateCalendarEventData(input);

      expect(result).toEqual({
        id: "event-789",
        taskId: "task-123",
        userId: "user-456",
        date,
        startTime,
        endTime,
      });
    });
  });

  describe("buildCalendarEndTime", () => {
    it("should build end time by adding default duration", () => {
      const startTime = new Date("2024-07-01T10:00:00Z");
      const expectedEndTime = new Date("2024-07-01T11:00:00Z");

      const endTime = buildCalendarEndTime(startTime);

      expect(endTime).toEqual(expectedEndTime);
    });

    it("should build end time by adding custom duration", () => {
      const startTime = new Date("2024-07-01T10:00:00Z");
      const durationMinutes = 30;
      const expectedEndTime = new Date("2024-07-01T10:30:00Z");

      const endTime = buildCalendarEndTime(startTime, durationMinutes);

      expect(endTime).toEqual(expectedEndTime);
    });
  });
});
