/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getErrors
// ====================================================

export interface getErrors_getErrors_errors_graphStats {
  __typename: "UnitErrorGraphStats";
  value: number;
  dateTime: string;
}

export interface getErrors_getErrors_errors {
  __typename: "UnitErrorListitem";
  id: number;
  unitName: string;
  type: string;
  message: string | null;
  lastEventDateTime: string;
  graphStats: getErrors_getErrors_errors_graphStats[];
}

export interface getErrors_getErrors {
  __typename: "GetUnitErrorsResponse";
  errors: getErrors_getErrors_errors[];
  offset: number;
  hasMore: boolean;
}

export interface getErrors {
  getErrors: getErrors_getErrors;
}

export interface getErrorsVariables {
  from: string;
  to?: string | null;
  offset?: number | null;
}
