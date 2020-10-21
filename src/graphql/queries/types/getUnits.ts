/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getUnits
// ====================================================

export interface getUnits_getUnits_units {
  __typename: "UnitListDetails";
  unitName: string;
  estimatedCost: number | null;
  invocations: string;
  errors: string;
  errorRate: number | null;
  averageDuration: number | null;
}

export interface getUnits_getUnits {
  __typename: "GetUnitsResponse";
  units: getUnits_getUnits_units[];
  offset: number;
  hasMore: boolean;
}

export interface getUnits {
  getUnits: getUnits_getUnits;
}

export interface getUnitsVariables {
  search?: string | null;
  offset?: number | null;
  from: string;
  to?: string | null;
  orderBy?: string | null;
  orderDirection?: string | null;
}
