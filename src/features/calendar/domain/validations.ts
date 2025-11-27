import { IResult } from "../../../shared/utils/resultPattern";
import { CreateCalendarEventErrorCode } from "./types/results";

export const validateCalendarEventDateRange = (
  startTime: Date | string,
  endTime: Date | string
): IResult<true, CreateCalendarEventErrorCode> => {
  const start = new Date(startTime);
  const end = new Date(endTime);

  if (end < start) {
    return {
      error: {
        code: "END_BEFORE_START",
        message: "End time must be after start time",
      },
    };
  }

  if (end.getTime() === start.getTime()) {
    return {
      error: {
        code: "SAME_START_END",
        message: "Start time and end time cannot be the same",
      },
    };
  }

  return {
    result: true,
  };
};
