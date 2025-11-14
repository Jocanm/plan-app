import { CreateProjectData, CreateProjectInput } from "./types/project";
import { getDefaultProjectColor } from "./utils";

export const buildCreateProjectData = (
  input: CreateProjectInput
): CreateProjectData => {
  return {
    name: input.name,
    userId: input.userId,
    id: input.id ?? crypto.randomUUID(),
    color: input.color ?? getDefaultProjectColor(),
  };
};
