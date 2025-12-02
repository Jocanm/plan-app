interface TaskDragPreviewProps {
  title: string;
  color: string;
}

export const TaskDragPreview = ({ title, color }: TaskDragPreviewProps) => (
  <div
    className="bg-card border border-l-4 rounded-lg px-3 py-2.5 shadow-xl w-[240px] opacity-95"
    style={{ borderLeftColor: color }}
  >
    <p className="text-sm font-medium truncate text-card-foreground">{title}</p>
  </div>
);
