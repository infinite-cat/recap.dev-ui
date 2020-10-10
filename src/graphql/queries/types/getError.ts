/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getError
// ====================================================

export interface getError_getError {
  __typename: "UnitError";
  id: number;
  unitName: string;
  type: string;
  message: string | null;
  rawError: string;
  lastEventDateTime: string;
}

export interface getError_getErrorStats {
  __typename: "UnitErrorDetailsGraphStats";
  invocations: number;
  errors: number;
  currentErrors: number;
  dateTime: string;
}

export interface getError_getTraces_traces {
  __typename: "Trace";
  id: number;
  logs: string | null;
}

export interface getError_getTraces {
  __typename: "GetTracesResponse";
  traces: getError_getTraces_traces[];
}

export interface getError {
  getError: getError_getError | null;
  getErrorStats: getError_getErrorStats[];
  getTraces: getError_getTraces;
}

export interface getErrorVariables {
  from: string;
  to: string;
  id: string;
}
