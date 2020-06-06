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

export interface getError {
  getError: getError_getError | null;
  getErrorStats: getError_getErrorStats[];
}

export interface getErrorVariables {
  graphSince: string;
  id: string;
}
