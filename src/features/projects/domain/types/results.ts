import { IResult } from "@/shared/utils/resultPattern";
import { Project } from "./project";

export type CreateProjectErrorCode = "UNKNOWN_ERROR";
export type CreateProjectResult = IResult<Project, CreateProjectErrorCode>;
