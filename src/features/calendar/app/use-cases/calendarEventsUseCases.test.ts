import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { FakeCalendarEventsRepositoryManager } from "../../data/calendar-events.repository.fake";
import { calendarEventsUseCases } from "./calendarEventsUseCases";

describe("CalendarEvents - use cases", () => {
  const repoManager = FakeCalendarEventsRepositoryManager.getInstance();

  beforeEach(() => {
    repoManager.reset();
  });

  afterAll(() => {
    repoManager.reset();
  });

  describe("Create calendar event", () => {
    it("should create a calendar event with correct data", async () => {
      const repo = repoManager.getRepository();

      const eventData = {
        taskId: "task-1",
        userId: "default-user",
        date: new Date("2025-01-20"),
        startTime: new Date("2025-01-20T09:00:00"),
        endTime: new Date("2025-01-20T10:00:00"),
      };

      const { result } = await calendarEventsUseCases.createCalendarEvent({
        repo,
        data: eventData,
      });

      expect(result).toEqual({
        id: expect.any(String),
        taskId: "task-1",
        userId: "default-user",
        date: expect.any(Date),
        startTime: expect.any(Date),
        endTime: expect.any(Date),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });

    it("should handle unexpected errors", async () => {
      const repo = repoManager
        .withOverride("create", () => {
          throw new Error("DB error");
        })
        .getRepository();

      const eventData = {
        taskId: "task-1",
        userId: "default-user",
        date: new Date("2025-01-20"),
        startTime: new Date("2025-01-20T09:00:00"),
        endTime: new Date("2025-01-20T10:00:00"),
      };

      const { error } = await calendarEventsUseCases.createCalendarEvent({
        repo,
        data: eventData,
      });

      expect(error).not.toBeUndefined();
      expect(error?.code).toBe("UNKNOWN_ERROR");
    });

    it("should return success result on successful creation", async () => {
      const repo = repoManager.getRepository();

      const eventData = {
        taskId: "task-1",
        userId: "default-user",
        date: new Date("2025-01-20"),
        startTime: new Date("2025-01-20T09:00:00"),
        endTime: new Date("2025-01-20T10:00:00"),
      };

      const response = await calendarEventsUseCases.createCalendarEvent({
        repo,
        data: eventData,
      });

      expect(response.result).toBeDefined();
      expect(response.error).toBeUndefined();
    });
  });
});
