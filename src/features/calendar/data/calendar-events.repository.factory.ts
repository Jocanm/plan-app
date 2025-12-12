import { repositoryConfig } from "@/lib/config/repositories";
import { ICalendarEventRepository } from "../domain/types/repository";
import {
  create,
  getById,
  getByUserAndDate,
  update,
} from "./calendar-events.repository";
import { createFakeCalendarEventsRepository } from "./calendar-events.repository.fake";

const createCalendarEventsRepository = (
  config = repositoryConfig
): ICalendarEventRepository => {
  if (config.isTest) {
    return createFakeCalendarEventsRepository();
  }

  return {
    create,
    getByUserAndDate,
    update,
    getById,
  };
};

export const calendarEventsRepository = createCalendarEventsRepository();
