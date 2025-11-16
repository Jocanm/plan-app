import { IResult } from "@/shared/utils/resultPattern";
import { Project, ProjectDetail, ProjectSidebar } from "./project";

export type CommonErrorCode = "UNKNOWN_ERROR";

export type GetProjectsForSidebarErrorCode = CommonErrorCode;
export type GetProjectsForSidebarResult = IResult<
  ProjectSidebar[],
  GetProjectsForSidebarErrorCode
>;

export type GetProjectDetailsErrorCode = CommonErrorCode;
export type GetProjectDetailsResult = IResult<
  ProjectDetail | null,
  GetProjectDetailsErrorCode
>;

export type CreateProjectErrorCode = CommonErrorCode;
export type CreateProjectResult = IResult<Project, CreateProjectErrorCode>;

export type CountUserProjectsErrorCode = CommonErrorCode;
export type CountUserProjectsResult = IResult<
  number,
  CountUserProjectsErrorCode
>;
