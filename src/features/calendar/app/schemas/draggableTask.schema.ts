import z from "zod";

export const draggableTaskSchema = z.object({
  taskId: z.string(),
  taskColor: z.string(),
  taskTitle: z.string(),
  taskProjectId: z.string().nullable().optional(),
});

export type DraggableTaskSchema = z.infer<typeof draggableTaskSchema>;
