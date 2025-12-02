import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview";
import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { TaskDragPreview } from "../../components/card/TaskDragPreview";

interface UseDraggableTaskProps {
  id: string;
  title: string;
  color: string;
  isOptimistic: boolean;
}

export const useDraggableTask = ({
  id,
  title,
  color,
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
      getInitialData: () => ({ taskId: id }),
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
  }, [id, title, color, isOptimistic]);

  return { mainRef, dragHandleRef, isDragging };
};
