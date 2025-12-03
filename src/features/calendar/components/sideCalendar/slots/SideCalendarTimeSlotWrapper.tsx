import clsx from "clsx";
import { useDroppableCalendarSlot } from "../../../app/hooks/useDroppableCalendarSlot";
import { useTaskDropHandler } from "../../../app/hooks/useTaskDropHandler";

export interface SideCalendarTimeSlotWrapperProps {
  [key: string]: unknown;
  value?: Date;
  children?: React.ReactNode;
}

export const SideCalendarTimeSlotWrapper = (
  props: SideCalendarTimeSlotWrapperProps
) => {
  const { handleDrop } = useTaskDropHandler();

  const { ref, isDraggedOver } = useDroppableCalendarSlot({
    onDrop: ({ source }) => handleDrop(source.data, props.value),
    canDrop: element => element.element.closest(".rbc-time-gutter") === null,
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
