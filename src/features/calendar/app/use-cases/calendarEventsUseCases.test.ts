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

  describe("Update calendar event", () => {
    it("should update event successfully with both fields", async () => {
      const repo = repoManager
        .seed([
          {
            id: "event-1",
            userId: "user-1",
            taskId: "task-1",
            date: new Date("2025-01-15"),
            startTime: new Date("2025-01-15T09:00:00"),
            endTime: new Date("2025-01-15T10:00:00"),
          },
        ])
        .getRepository();

      const { result } = await calendarEventsUseCases.updateCalendarEvent({
        repo,
        data: {
          id: "event-1",
          date: new Date("2025-01-15"),
          startTime: new Date("2025-01-15T10:00:00"),
          endTime: new Date("2025-01-15T11:00:00"),
        },
      });

      expect(result).toBeDefined();
      expect(result?.startTime).toEqual(new Date("2025-01-15T10:00:00"));
      expect(result?.endTime).toEqual(new Date("2025-01-15T11:00:00"));
    });

    it("should update only startTime (resize start)", async () => {
      const repo = repoManager
        .seed([
          {
            id: "event-1",
            date: new Date("2025-01-15"),
            startTime: new Date("2025-01-15T09:00:00"),
            endTime: new Date("2025-01-15T10:00:00"),
          },
        ])
        .getRepository();

      const { result } = await calendarEventsUseCases.updateCalendarEvent({
        repo,
        data: {
          id: "event-1",
          date: new Date("2025-01-15"),
          startTime: new Date("2025-01-15T08:30:00"),
        },
      });

      expect(result?.startTime).toEqual(new Date("2025-01-15T08:30:00"));
      expect(result?.endTime).toEqual(new Date("2025-01-15T10:00:00")); // Sin cambio
    });

    it("should update only endTime (resize end)", async () => {
      const repo = repoManager
        .seed([
          {
            id: "event-1",
            date: new Date("2025-01-15"),
            startTime: new Date("2025-01-15T09:00:00"),
            endTime: new Date("2025-01-15T10:00:00"),
          },
        ])
        .getRepository();

      const { result } = await calendarEventsUseCases.updateCalendarEvent({
        repo,
        data: {
          id: "event-1",
          date: new Date("2025-01-15"),
          endTime: new Date("2025-01-15T11:30:00"),
        },
      });

      expect(result?.startTime).toEqual(new Date("2025-01-15T09:00:00")); // Sin cambio
      expect(result?.endTime).toEqual(new Date("2025-01-15T11:30:00"));
    });

    it("should use date from client when crossing midnight", async () => {
      const repo = repoManager
        .seed([
          {
            id: "event-1",
            date: new Date("2025-01-15"),
            startTime: new Date("2025-01-15T23:00:00"),
            endTime: new Date("2025-01-16T00:00:00"),
          },
        ])
        .getRepository();

      const { result } = await calendarEventsUseCases.updateCalendarEvent({
        repo,
        data: {
          id: "event-1",
          date: new Date("2025-01-16"), // Cliente calcula el nuevo date
          startTime: new Date("2025-01-16T01:00:00"),
          endTime: new Date("2025-01-16T02:00:00"),
        },
      });

      // Date debe ser el que envió el cliente
      expect(result?.date).toEqual(new Date("2025-01-16"));
    });

    it("should return EVENT_NOT_FOUND if event does not exist", async () => {
      const repo = repoManager.getRepository();

      const { error } = await calendarEventsUseCases.updateCalendarEvent({
        repo,
        data: {
          id: "non-existent",
          date: new Date("2025-01-15"),
          startTime: new Date(),
        },
      });

      expect(error?.code).toBe("EVENT_NOT_FOUND");
    });

    it("should return NO_CHANGES_PROVIDED if no fields sent", async () => {
      const repo = repoManager.getRepository();

      const { error } = await calendarEventsUseCases.updateCalendarEvent({
        repo,
        data: {
          id: "event-1",
          date: new Date("2025-01-15"),
        },
      });

      expect(error?.code).toBe("NO_CHANGES_PROVIDED");
    });

    it("should return END_BEFORE_START on validation failure", async () => {
      const repo = repoManager
        .seed([
          {
            id: "event-1",
            date: new Date("2025-01-15"),
            startTime: new Date("2025-01-15T09:00:00"),
            endTime: new Date("2025-01-15T10:00:00"),
          },
        ])
        .getRepository();

      const { error } = await calendarEventsUseCases.updateCalendarEvent({
        repo,
        data: {
          id: "event-1",
          date: new Date("2025-01-15"),
          startTime: new Date("2025-01-15T11:00:00"), // Después del endTime actual
        },
      });

      expect(error?.code).toBe("END_BEFORE_START");
    });

    it("should return SAME_START_END if times are equal", async () => {
      const repo = repoManager
        .seed([
          {
            id: "event-1",
            date: new Date("2025-01-15"),
            startTime: new Date("2025-01-15T09:00:00"),
            endTime: new Date("2025-01-15T10:00:00"),
          },
        ])
        .getRepository();

      const { error } = await calendarEventsUseCases.updateCalendarEvent({
        repo,
        data: {
          id: "event-1",
          date: new Date("2025-01-15"),
          startTime: new Date("2025-01-15T10:00:00"),
          endTime: new Date("2025-01-15T10:00:00"),
        },
      });

      expect(error?.code).toBe("SAME_START_END");
    });

    it("should handle unexpected errors", async () => {
      const repo = repoManager
        .withOverride("getById", () => {
          throw new Error("DB error");
        })
        .getRepository();

      const { error } = await calendarEventsUseCases.updateCalendarEvent({
        repo,
        data: {
          id: "event-1",
          date: new Date("2025-01-15"),
          startTime: new Date(),
        },
      });

      expect(error?.code).toBe("UNKNOWN_ERROR");
    });
  });
});
