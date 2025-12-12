import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview";
import { useEffect, useEffectEvent, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { DraggableTaskSchema } from "../../../calendar/app/schemas/draggableTask.schema";
import { TaskDragPreview } from "../../components/card/TaskDragPreview";

interface UseDraggableTaskProps {
  id: string;
  title: string;
  color: string;
  isOptimistic: boolean;
  projectId: string | undefined;
  projectColor: string | undefined;
}

export const useDraggableTask = ({
  id,
  title,
  color,
  projectId,
  isOptimistic,
  projectColor,
}: UseDraggableTaskProps) => {
  const mainRef = useRef<HTMLElement>(null);
  const dragHandleRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const getInitialData = useEffectEvent(
    (): DraggableTaskSchema => ({
      taskId: id,
      taskTitle: title,
      taskColor: color,
      taskProjectId: projectId,
      taskProjectColor: projectColor,
    })
  );

  useEffect(() => {
    if (!mainRef.current || !dragHandleRef.current || isOptimistic) return;

    const cleanup = draggable({
      element: mainRef.current,
      dragHandle: dragHandleRef.current,
      onDrop: () => setIsDragging(false),
      onDragStart: () => setIsDragging(true),
      getInitialData,
      onGenerateDragPreview: ({ nativeSetDragImage }) => {
        setCustomNativeDragPreview({
          render({ container }) {
            const root = createRoot(container);
            root.render(<TaskDragPreview title={title} color={color} />);
            return function cleanup() {
              root.unmount();
            };
          },
          nativeSetDragImage,
        });
      },
    });

    return () => {
      cleanup();
    };
  }, [title, color, isOptimistic]);

  return { mainRef, dragHandleRef, isDragging };
};
