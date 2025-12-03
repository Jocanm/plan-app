import { logger } from "@/lib/logger";
import { generateId } from "@/lib/utils/id";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useCurrentUser } from "../../../../auth/app/hooks/useCurrentUser";
import { useCreateCalendarEvent } from "../../../app/hooks/actions/useCreateCalendarEvent";
import { useDroppableCalendarSlot } from "../../../app/hooks/useDroppableCalendarSlot";
import { CalendarEvents } from "../../../domain/events/catalog";
import { toCalendarDateISO } from "../../../domain/utils";

export interface SideCalendarTimeSlotWrapperProps {
  [key: string]: unknown;
  value?: Date;
  children?: React.ReactNode;
}

export const SideCalendarTimeSlotWrapper = (
  props: SideCalendarTimeSlotWrapperProps
) => {
  const currentUser = useCurrentUser();
  const mutation = useCreateCalendarEvent();
  const t = useTranslations("calendar.errors");

  const onMutationError = () => {
    toast.error(t("create_event_failed"), {
      description: t("create_event_failed_description"),
    });
  };

  const { ref, isDraggedOver } = useDroppableCalendarSlot({
    onDrop: async ({ source: { data } }) => {
      if (!currentUser) {
        logger.error(
          {
            event: CalendarEvents.missingUserSession,
            slotValue: props.value?.toISOString(),
          },
          "Calendar event creation failed: missing user session"
        );
        toast.error(t("missing_data"));
        return;
      }

      if (!props.value) {
        logger.error(
          {
            event: CalendarEvents.missingSlotValue,
            userId: currentUser.id,
          },
          "Calendar event creation failed: missing slot value"
        );
        toast.error(t("missing_data"));
        return;
      }

      const taskId = data.taskId as string | undefined;
      const taskTitle = data.title as string | undefined;

      if (!taskId || !taskTitle) {
        logger.error(
          {
            event: CalendarEvents.invalidDragData,
            userId: currentUser.id,
            dragData: data,
          },
          "Calendar event creation failed: invalid drag data"
        );
        toast.error(t("invalid_drag_data"));
        return;
      }

      mutation.mutate(
        {
          id: generateId(),
          taskId,
          taskTitle,
          userId: currentUser.id,
          date: toCalendarDateISO(props.value),
          startTime: props.value.toISOString(),
        },
        { onError: onMutationError }
      );
    },
  });

  return (
    <div
      ref={ref}
      {...props}
      className={clsx(
        "flex-1",
        isDraggedOver && "bg-primary/10 border-2 border-primary border-dashed",
        props.className as string
      )}
    >
      {props.children}
    </div>
  );
};
