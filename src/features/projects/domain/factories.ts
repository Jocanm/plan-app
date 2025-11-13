import { CreateProjectData, CreateProjectInput } from "./types/project";
import { getDefaultProjectColor } from "./utils";

export const buildCreateProjectData = (
  input: CreateProjectInput
): CreateProjectData => {
  return {
    id: crypto.randomUUID(),
    name: input.name,
    userId: input.userId,
    color: input.color ?? getDefaultProjectColor(),
  };
};
