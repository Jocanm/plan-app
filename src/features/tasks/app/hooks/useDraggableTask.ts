import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { useEffect, useRef, useState } from "react";

export const useDraggableTask = (id: string) => {
  const ref = useRef<HTMLElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const cleanup = draggable({
      element: ref.current,
      onDrop: () => setIsDragging(false),
      getInitialData: () => ({ taskId: id }),
      onDragStart: () => setIsDragging(true),
    });

    return () => {
      cleanup();
    };
  }, [id]);

  return { ref, isDragging };
};
