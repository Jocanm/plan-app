import z from "zod";
import {
  PROJECT_NAME_MAX_LENGTH,
  PROJECT_NAME_MIN_LENGTH,
} from "../../domain/constants";

export const createProjectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "name_required")
    .min(PROJECT_NAME_MIN_LENGTH, "name_too_short")
    .max(PROJECT_NAME_MAX_LENGTH, "name_too_long"),

  color: z.string().optional(),
});

export type CreateProjectSchema = z.infer<typeof createProjectSchema>;
