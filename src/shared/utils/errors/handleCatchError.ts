import { logger } from "../../../lib/logger";
import { GlobalEvents } from "../../domain/events/catalog";
import { CommonResultErrorCode } from "../../types/results";
import { createErrorResult } from "../resultPattern";
import { handleUnknownError } from "./handleUnknownError";

export const handleCatchError = (error: unknown, customMessage: string) => {
  const errorMessage = handleUnknownError(error);
  logger.error(
    { event: GlobalEvents.unknownErrorOccurred, errorMessage },
    customMessage
  );

  return createErrorResult<CommonResultErrorCode>(
    "UNKNOWN_ERROR",
    customMessage
  );
};
