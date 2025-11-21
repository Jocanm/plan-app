import { CalendarEvent } from "../domain/types/calendar-event";
import { ICalendarEventRepository } from "../domain/types/repository";

declare global {
  var __fakeCalendarEventsRepo: FakeCalendarEventsRepositoryManager | undefined;
}

const DEFAULT_CALENDAR_EVENT = {
  taskId: "default-task-id",
  userId: "default-user-id",
  date: new Date(),
  startTime: new Date(),
  endTime: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
} satisfies Partial<CalendarEvent>;

const makeCalendarEvent = (
  overrides: Partial<CalendarEvent> = {}
): CalendarEvent => ({
  ...DEFAULT_CALENDAR_EVENT,
  id: crypto.randomUUID(),
  ...overrides,
});

export class FakeCalendarEventsRepositoryManager {
  private events: CalendarEvent[] = [];
  public overrides: Partial<ICalendarEventRepository> = {};

  private constructor() {}

  static getInstance() {
    if (!global.__fakeCalendarEventsRepo) {
      global.__fakeCalendarEventsRepo =
        new FakeCalendarEventsRepositoryManager();
    }
    return global.__fakeCalendarEventsRepo;
  }

  reset(): FakeCalendarEventsRepositoryManager {
    this.events = [];
    this.overrides = {};
    return this;
  }

  seed(events: Partial<CalendarEvent>[]): FakeCalendarEventsRepositoryManager {
    this.events = events.map(makeCalendarEvent);
    return this;
  }

  addEvent(event: Partial<CalendarEvent>): FakeCalendarEventsRepositoryManager {
    this.events.push(makeCalendarEvent(event));
    return this;
  }

  withOverride<K extends keyof ICalendarEventRepository>(
    method: K,
    implementation: ICalendarEventRepository[K]
  ): FakeCalendarEventsRepositoryManager {
    this.overrides[method] = implementation;
    return this;
  }

  getRepository(): ICalendarEventRepository {
    return {
      create: async data => {
        if (this.overrides.create) {
          return this.overrides.create(data);
        }

        const event = makeCalendarEvent(data);
        this.addEvent(event);
        return event;
      },
    };
  }
}

export const createFakeCalendarEventsRepository =
  (): ICalendarEventRepository => {
    return FakeCalendarEventsRepositoryManager.getInstance().getRepository();
  };
