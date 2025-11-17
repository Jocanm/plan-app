import { CommonResultErrorCode } from "@/shared/types/results";
import { IResult } from "@/shared/utils/resultPattern";
import { Task } from "./task";

export type CreateTaskErrorCode = CommonResultErrorCode;
export type CreateTaskResult = IResult<Task, CreateTaskErrorCode>;
