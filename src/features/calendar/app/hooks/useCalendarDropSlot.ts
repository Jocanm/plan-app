import {
  DropTargetArgs,
  ElementDragType,
} from "@atlaskit/pragmatic-drag-and-drop/dist/types/internal-types";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { useEffect, useEffectEvent, useRef, useState } from "react";

type Options = Omit<DropTargetArgs<ElementDragType>, "element">;

export const useCalendarDropSlot = ({
  onDrop,
  onDragLeave,
  onDragEnter,
  ...options
}: Partial<Options> = {}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isDraggedOver, setIsDraggedOver] = useState(false);

  const setDropTarget = useEffectEvent((element: HTMLDivElement) => {
    return dropTargetForElements({
      element,
      onDragEnter: args => {
        setIsDraggedOver(true);
        onDragEnter?.(args);
      },
      onDragLeave: args => {
        setIsDraggedOver(false);
        onDragLeave?.(args);
      },
      onDrop: args => {
        setIsDraggedOver(false);
        onDrop?.(args);
      },
      ...options,
    });
  });

  useEffect(() => {
    if (ref.current) {
      const isTimeGutter = ref.current.closest(".rbc-time-gutter") !== null;
      if (isTimeGutter) return;

      const cleanup = setDropTarget(ref.current);

      return cleanup;
    }
  }, []);

  return { ref, isDraggedOver };
};
