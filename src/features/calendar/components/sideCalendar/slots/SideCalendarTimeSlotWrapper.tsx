import clsx from "clsx";
import { useCurrentUser } from "../../../../auth/app/hooks/useCurrentUser";
import { useCreateCalendarEvent } from "../../../app/hooks/actions/useCreateCalendarEvent";
import { useDroppableCalendarSlot } from "../../../app/hooks/useDroppableCalendarSlot";
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

  const { ref, isDraggedOver } = useDroppableCalendarSlot({
    onDrop: async ({ source: { data } }) => {
      const taskId = data.taskId as string;
      const taskTitle = data.title as string;
      const eventId = crypto.randomUUID();
      mutation.mutate({
        taskId,
        taskTitle,
        id: eventId,
        userId: currentUser!.id,
        date: toCalendarDateISO(props.value!),
        startTime: props.value!.toISOString(),
      });
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
    />
  );
};
