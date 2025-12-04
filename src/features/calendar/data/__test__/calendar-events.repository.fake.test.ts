import { beforeEach, describe, expect, it } from "vitest";
import { FakeCalendarEventsRepositoryManager } from "../calendar-events.repository.fake";

describe("CalendarEvents Repository fake", () => {
  beforeEach(() => {
    FakeCalendarEventsRepositoryManager.getInstance().reset();
  });

  it("FakeCalendarEventsRepositoryManager is singleton", () => {
    const instance1 = FakeCalendarEventsRepositoryManager.getInstance();
    const instance2 = FakeCalendarEventsRepositoryManager.getInstance();

    expect(instance1).toBe(instance2);
  });

  it("FakeCalendarEventsRepositoryManager seed should populate the events", async () => {
    const manager = FakeCalendarEventsRepositoryManager.getInstance();

    manager.seed([
      { taskId: "task-1", userId: "user-1" },
      { taskId: "task-2", userId: "user-1" },
      { taskId: "task-3", userId: "user-2" },
    ]);

    expect(manager["events"]).toHaveLength(3);
  });

  it("FakeCalendarEventsRepositoryManager should be able to create calendar events", async () => {
    const manager = FakeCalendarEventsRepositoryManager.getInstance();
    const repo = manager.getRepository();
    manager.reset();

    const eventData = {
      taskId: "task-1",
      userId: "user-1",
      date: new Date("2025-01-20"),
      startTime: new Date("2025-01-20T09:00:00"),
      endTime: new Date("2025-01-20T10:00:00"),
    };

    const createdEvent = await repo.create(eventData);

    expect(createdEvent).toEqual({
      id: expect.any(String),
      taskId: "task-1",
      userId: "user-1",
      date: expect.any(Date),
      startTime: expect.any(Date),
      endTime: expect.any(Date),
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
    expect(manager["events"]).toHaveLength(1);
  });

  it("Reset method should clear all events", async () => {
    const manager = FakeCalendarEventsRepositoryManager.getInstance();
    manager.seed([{ taskId: "task-1" }]);
    manager.reset();

    expect(manager["events"]).toHaveLength(0);
  });

  it("Should handle override for create method", async () => {
    const manager = FakeCalendarEventsRepositoryManager.getInstance();
    const repo = manager
      .withOverride("create", async () => {
        throw new Error("DB error");
      })
      .getRepository();

    await expect(
      repo.create({
        taskId: "task-1",
        userId: "user-1",
        date: new Date(),
        startTime: new Date(),
        endTime: new Date(),
      })
    ).rejects.toThrow("DB error");
  });

  it("Should handle override for getByUserAndDate method", async () => {
    const manager = FakeCalendarEventsRepositoryManager.getInstance();
    const date = new Date("2025-01-20");

    const repo = manager
      .withOverride("getByUserAndDate", async () => {
        return [
          {
            id: "event-1",
            taskId: "task-1",
            userId: "user-1",
            date,
            startTime: new Date(),
            endTime: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
            task: {
              id: "task-1",
              title: "Override Task",
              projectId: null,
              color: "#3b82f6",
            },
          },
        ];
      })
      .getRepository();

    const events = await repo.getByUserAndDate("user-1", date);

    expect(events).toHaveLength(1);
    expect(events[0].id).toBe("event-1");
  });
});
