import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { useEffect, useState } from "react";

export const useIsDraggingInCalendar = () => {
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    return monitorForElements({
      onDrop: () => setIsDragging(false),
      onDragStart: () => setIsDragging(true),
    });
  }, []);

  return isDragging;
};
