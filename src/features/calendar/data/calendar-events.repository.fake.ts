import { generateId } from "@/lib/utils/id";
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
  id: generateId(),
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

        const event = makeCalendarEvent({
          ...data,
          date: new Date(data.date),
          startTime: new Date(data.startTime),
          endTime: new Date(data.endTime),
        });
        this.addEvent(event);
        return event;
      },

      getByUserAndDate: async (userId, date) => {
        if (this.overrides.getByUserAndDate) {
          return this.overrides.getByUserAndDate(userId, date);
        }

        const dateToCompare = typeof date === "string" ? new Date(date) : date;

        return this.events
          .filter(
            event =>
              event.userId === userId &&
              event.date.toDateString() === dateToCompare.toDateString()
          )
          .map(event => ({
            ...event,
            task: {
              id: event.taskId,
              title: "Default Task Title",
              projectId: null,
            },
          }));
      },
    };
  }
}

export const createFakeCalendarEventsRepository =
  (): ICalendarEventRepository => {
    return FakeCalendarEventsRepositoryManager.getInstance().getRepository();
  };
