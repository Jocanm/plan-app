import { IResult } from "@/shared/utils/resultPattern";
import { Project } from "./project";

export type CommonErrorCode = "UNKNOWN_ERROR";

export type CreateProjectErrorCode = CommonErrorCode;
export type CreateProjectResult = IResult<Project, CreateProjectErrorCode>;

export type CountUserProjectsErrorCode = CommonErrorCode;
export type CountUserProjectsResult = IResult<
  number,
  CountUserProjectsErrorCode
>;
