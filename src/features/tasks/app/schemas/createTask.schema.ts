import z from "zod";
import {
  MAX_TASK_TITLE_LENGTH,
  MIN_TASK_TITLE_LENGTH,
  TASK_TITLE_REQUIRED_ERROR,
  TASK_TITLE_TOO_LONG_ERROR,
} from "../../domain/constants";

export const createTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(MIN_TASK_TITLE_LENGTH, TASK_TITLE_REQUIRED_ERROR)
    .max(MAX_TASK_TITLE_LENGTH, TASK_TITLE_TOO_LONG_ERROR),
  projectId: z.uuid().optional(),
});

export type CreateTaskSchema = z.infer<typeof createTaskSchema>;
