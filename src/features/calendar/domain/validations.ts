import { IResult } from "../../../shared/utils/resultPattern";
import { CreateCalendarEventErrorCode } from "./types/results";

export const validateCalendarEventDateRange = (
  startTime: Date,
  endTime: Date
): IResult<true, CreateCalendarEventErrorCode> => {
  if (endTime < startTime) {
    return {
      error: {
        code: "END_BEFORE_START",
        message: "End time must be after start time",
      },
    };
  }

  if (endTime.getTime() === startTime.getTime()) {
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
