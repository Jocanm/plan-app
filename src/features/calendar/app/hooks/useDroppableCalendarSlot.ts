// src/features/calendar/app/hooks/useDroppableCalendarSlot.ts
import {
  DropTargetArgs,
  ElementDragType,
} from "@atlaskit/pragmatic-drag-and-drop/dist/types/internal-types";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { useEffect, useEffectEvent, useRef, useState } from "react";
import {
  draggableTaskSchema,
  DraggableTaskSchema,
} from "../schemas/draggableTask.schema";

type Options = Omit<DropTargetArgs<ElementDragType>, "element">;

export const useDroppableCalendarSlot = ({
  onDrop,
  onDragLeave,
  onDragEnter,
  ...options
}: Partial<Options> = {}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isDraggedOver, setIsDraggedOver] = useState(false);
  const [draggedTaskData, setDraggedTaskData] =
    useState<DraggableTaskSchema | null>(null);

  const setDropTarget = useEffectEvent((element: HTMLDivElement) => {
    return dropTargetForElements({
      element,
      onDragEnter: args => {
        setIsDraggedOver(true);
        const parsed = draggableTaskSchema.safeParse(args.source.data);
        if (parsed.success) {
          setDraggedTaskData(parsed.data);
        }
        onDragEnter?.(args);
      },
      onDragLeave: args => {
        setIsDraggedOver(false);
        setDraggedTaskData(null);
        onDragLeave?.(args);
      },
      onDrop: args => {
        setIsDraggedOver(false);
        setDraggedTaskData(null);
        onDrop?.(args);
      },
      ...options,
    });
  });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    return setDropTarget(element);
  }, []);

  return { ref, isDraggedOver, draggedTaskData };
};
