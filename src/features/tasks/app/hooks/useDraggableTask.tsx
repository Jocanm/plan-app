import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview";
import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { TaskDragPreview } from "../../components/card/TaskDragPreview";

interface UseDraggableTaskProps {
  id: string;
  title: string;
  color: string;
  projectId?: string | null;
  isOptimistic: boolean;
}

export const useDraggableTask = ({
  id,
  title,
  color,
  projectId,
  isOptimistic,
}: UseDraggableTaskProps) => {
  const mainRef = useRef<HTMLElement>(null);
  const dragHandleRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!mainRef.current || !dragHandleRef.current || isOptimistic) return;

    const cleanup = draggable({
      element: mainRef.current,
      dragHandle: dragHandleRef.current,
      onDrop: () => setIsDragging(false),
      onDragStart: () => setIsDragging(true),
      getInitialData: () => ({ taskId: id, title, color, projectId }),
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
  }, [id, title, color, projectId, isOptimistic]);

  return { mainRef, dragHandleRef, isDragging };
};
