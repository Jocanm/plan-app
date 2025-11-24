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

    it("should return error result on validation failure", async () => {
      const repo = repoManager.getRepository();

      const eventData = {
        taskId: "task-1",
        userId: "default-user",
        date: new Date("2025-01-20"),
        startTime: new Date("2025-01-20T10:00:00"),
        endTime: new Date("2025-01-20T09:00:00"),
      };

      const response = await calendarEventsUseCases.createCalendarEvent({
        repo,
        data: eventData,
      });

      expect(response.error).toBeDefined();
      expect(response.result).toBeUndefined();
      expect(response.error?.code).toBe("END_BEFORE_START");
    });

    it("should return error result when start and end times are the same", async () => {
      const repo = repoManager.getRepository();

      const eventData = {
        taskId: "task-1",
        userId: "default-user",
        date: new Date("2025-01-20"),
        startTime: new Date("2025-01-20T10:00:00"),
        endTime: new Date("2025-01-20T10:00:00"),
      };

      const response = await calendarEventsUseCases.createCalendarEvent({
        repo,
        data: eventData,
      });

      expect(response.error).toBeDefined();
      expect(response.result).toBeUndefined();
      expect(response.error?.code).toBe("SAME_START_END");
    });
  });

  describe("Get calendar events by user and date", () => {
    it("should return success result on successful retrieval", async () => {
      const date = new Date("2025-01-15");

      const repo = repoManager
        .seed([{ date, userId: "default-user", id: "event-id" }])
        .getRepository();

      const response = await calendarEventsUseCases.getByUserAndDate({
        repo,
        userId: "default-user",
        date,
      });

      expect(response.result).toBeDefined();
      expect(response.result?.length).toBe(1);
      expect(response.result?.[0].id).toBe("event-id");
    });

    it("should handle unexpected errors", async () => {
      const date = new Date("2025-01-15");

      const repo = repoManager
        .withOverride("getByUserAndDate", () => {
          throw new Error("DB error");
        })
        .getRepository();

      const response = await calendarEventsUseCases.getByUserAndDate({
        repo,
        userId: "default-user",
        date,
      });

      expect(response.error).not.toBeUndefined();
      expect(response.error?.code).toBe("UNKNOWN_ERROR");
    });

    it("should return empty array if no events found", async () => {
      const date = new Date("2025-01-15");

      const repo = repoManager.getRepository();

      const response = await calendarEventsUseCases.getByUserAndDate({
        repo,
        userId: "default-user",
        date,
      });

      expect(response.result).toBeDefined();
      expect(response.result?.length).toBe(0);
    });

    it("should filter events by date correctly", async () => {
      const targetDate = new Date("2025-01-15");
      const otherDate = new Date("2025-01-16");

      const repo = repoManager
        .seed([
          { date: targetDate, userId: "default-user", id: "event-1" },
          { date: otherDate, userId: "default-user", id: "event-2" },
        ])
        .getRepository();

      const response = await calendarEventsUseCases.getByUserAndDate({
        repo,
        userId: "default-user",
        date: targetDate,
      });

      expect(response.result).toBeDefined();
      expect(response.result?.length).toBe(1);
      expect(response.result?.[0].id).toBe("event-1");
    });

    it("should not return other users' events", async () => {
      const date = new Date("2025-01-15");

      const repo = repoManager
        .seed([
          { date, userId: "default-user", id: "event-1" },
          { date, userId: "other-user", id: "event-2" },
        ])
        .getRepository();

      const response = await calendarEventsUseCases.getByUserAndDate({
        repo,
        userId: "default-user",
        date,
      });

      expect(response.result).toBeDefined();
      expect(response.result?.length).toBe(1);
      expect(response.result?.[0].id).toBe("event-1");
    });
  });
});
