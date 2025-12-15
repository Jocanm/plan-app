import clsx from "clsx";
import { useDroppableCalendarSlot } from "../../../app/hooks/useDroppableCalendarSlot";
import { useTaskDropHandler } from "../../../app/hooks/useTaskDropHandler";
import { CalendarEventPreview } from "./CalendarEventPreview";

export interface SideCalendarTimeSlotWrapperProps {
  [key: string]: unknown;
  value?: Date;
  children?: React.ReactNode;
}

export const SideCalendarTimeSlotWrapper = (
  props: SideCalendarTimeSlotWrapperProps
) => {
  const { handleDrop } = useTaskDropHandler();

  const { ref, draggedTaskData } = useDroppableCalendarSlot({
    onDrop: ({ source }) => handleDrop(source.data, props.value),
    canDrop: ({ element }) => element.closest(".rbc-time-gutter") === null,
  });

  const { children, className, ...restProps } = props;

  return (
    <div
      ref={ref}
      {...restProps}
      className={clsx("flex-1 relative", className as string)}
    >
      {children}
      {draggedTaskData && props.value && (
        <CalendarEventPreview
          taskTitle={draggedTaskData.taskTitle}
          taskColor={draggedTaskData.taskColor}
          projectColor={draggedTaskData.taskProjectColor}
          startTime={props.value}
        />
      )}
    </div>
  );
};
