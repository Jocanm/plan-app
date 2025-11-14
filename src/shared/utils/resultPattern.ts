export type IResult<Result, ErrorCode> =
  | ISuccessResult<Result>
  | IErrorResult<ErrorCode>;

export interface IErrorResult<ErrorCode> {
  result?: never;
  error: IError<ErrorCode>;
}

export interface ISuccessResult<Result> {
  result: Result;
  error?: undefined;
}

export interface IError<ErrorCode> {
  message: string;
  code: ErrorCode;
}

export function createErrorResult<ErrorCode>(
  code: ErrorCode,
  message: string
): IErrorResult<ErrorCode> {
  return {
    error: {
      code,
      message,
    },
  };
}

export function createSuccessResult<T>(result: T): ISuccessResult<T> {
  return { result };
}
