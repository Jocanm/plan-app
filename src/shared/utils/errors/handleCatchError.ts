import { logger } from "../../../lib/logger";
import { GlobalEvents } from "../../domain/events/catalog";
import { CommonResultErrorCode } from "../../types/results";
import { createErrorResult } from "../resultPattern";
import { handleUnknownError } from "./handleUnknownError";

export const handleCatchError = (error: unknown) => {
  const errorMessage = handleUnknownError(error);
  logger.error(
    { event: GlobalEvents.unknownErrorOccurred, errorMessage },
    "An unknown error occurred"
  );

  return createErrorResult<CommonResultErrorCode>(
    "UNKNOWN_ERROR",
    "An unknown error occurred"
  );
};
