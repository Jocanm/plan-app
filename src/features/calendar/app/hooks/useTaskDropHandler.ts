import { logger } from "@/lib/logger";
import { generateId } from "@/lib/utils/id";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useCurrentUser } from "../../../auth/app/hooks/useCurrentUser";
import { CalendarEvents } from "../../domain/events/catalog";
import { toCalendarDateISO } from "../../domain/utils";
import { useCreateCalendarEvent } from "./actions/useCreateCalendarEvent";

export const useTaskDropHandler = () => {
  const currentUser = useCurrentUser();
  const mutation = useCreateCalendarEvent();
  const t = useTranslations("calendar.errors");

  const handleDrop = async (data: Record<string, unknown>, date?: Date) => {
    if (!currentUser) {
      logger.error(
        { event: CalendarEvents.missingUserSession },
        "Drop failed: missing session"
      );
      toast.error(t("missing_data"));
      return;
    }

    if (!date) {
      logger.error(
        {
          event: CalendarEvents.missingSlotValue,
          userId: currentUser.id,
        },
        "Drop failed: missing slot value"
      );
      toast.error(t("missing_data"));
      return;
    }

    const taskId = data.taskId as string | undefined;
    const taskTitle = data.title as string | undefined;

    if (!taskId || !taskTitle) {
      logger.error(
        {
          dragData: data,
          userId: currentUser.id,
          event: CalendarEvents.invalidDragData,
        },
        "Drop failed: invalid data"
      );
      toast.error(t("invalid_drag_data"));
      return;
    }

    try {
      await mutation.mutateAsync({
        id: generateId(),
        taskId,
        taskTitle,
        userId: currentUser.id,
        date: toCalendarDateISO(date),
        startTime: date.toISOString(),
      });
    } catch {
      toast.error(t("create_event_failed"), {
        description: t("create_event_failed_description"),
      });
    }
  };

  return { handleDrop };
};
