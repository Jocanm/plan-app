import z from "zod";
import {
  PROJECT_NAME_MAX_LENGTH,
  PROJECT_NAME_MIN_LENGTH,
} from "../../domain/constants";

export const createProjectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .min(PROJECT_NAME_MIN_LENGTH, "Name must be at least 3 characters")
    .max(PROJECT_NAME_MAX_LENGTH, "Name must be less than 50 characters"),

  color: z.string().optional(),
});

export type CreateProjectSchema = z.infer<typeof createProjectSchema>;
