import { IResult } from "@/shared/utils/resultPattern";
import { CommonResultErrorCode } from "../../../../shared/types/results";
import { Project, ProjectDetail, ProjectSidebar } from "./project";

export type GetProjectsForSidebarErrorCode = CommonResultErrorCode;
export type GetProjectsForSidebarResult = IResult<
  ProjectSidebar[],
  GetProjectsForSidebarErrorCode
>;

export type GetProjectDetailsErrorCode = CommonResultErrorCode;
export type GetProjectDetailsResult = IResult<
  ProjectDetail | null,
  GetProjectDetailsErrorCode
>;

export type CreateProjectErrorCode = CommonResultErrorCode;
export type CreateProjectResult = IResult<Project, CreateProjectErrorCode>;

export type CountUserProjectsErrorCode = CommonResultErrorCode;
export type CountUserProjectsResult = IResult<
  number,
  CountUserProjectsErrorCode
>;
