import clsx from "clsx";
import { useDroppableCalendarSlot } from "../../../app/hooks/useDroppableCalendarSlot";

export interface SideCalendarTimeSlotWrapperProps {
  [key: string]: unknown;
  children?: React.ReactNode;
}

export const SideCalendarTimeSlotWrapper = (
  props: SideCalendarTimeSlotWrapperProps
) => {
  const { ref, isDraggedOver } = useDroppableCalendarSlot();

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
