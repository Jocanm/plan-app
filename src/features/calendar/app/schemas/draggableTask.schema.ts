import z from "zod";

export const draggableTaskSchema = z.object({
  taskId: z.string(),
  taskColor: z.string(),
  taskTitle: z.string(),
  taskProjectId: z.string().optional(),
  taskProjectColor: z.string().optional(),
});

export type DraggableTaskSchema = z.infer<typeof draggableTaskSchema>;
