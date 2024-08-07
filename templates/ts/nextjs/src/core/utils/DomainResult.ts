import { ResultType } from "./ResultType";

export type DomainResult<T> =
  | { type: ResultType.Success; data: T; }
  | { type: ResultType.TechnicalError; code: number; message?: string; }
  | { type: ResultType.EmptyState; message?: string; }
  | { type: ResultType.ErrorState; message?: string; }
  | { type: ResultType.NetworkError; };

export const success = <T>(data: T): DomainResult<T> => ({
  type: ResultType.Success,
  data,
});

export const technicalError = (
  code: number,
  message?: string
): DomainResult<never> => ({
  type: ResultType.TechnicalError,
  code,
  message,
});

export const emptyState = (message?: string): DomainResult<never> => ({
  type: ResultType.EmptyState,
  message,
});

export const errorState = (message?: string): DomainResult<never> => ({
  type: ResultType.ErrorState,
  message,
});

export const failure = (error: Record<string, any> | string): DomainResult<never> => {
  if (typeof error === "string") {
    return errorState(error);
  }
  if (error?.code && typeof error?.code === "number") {
    return technicalError(error?.code, error?.message);
  } else {
    return errorState(error?.message || "Unknown error");
  }
};
