/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getUnit
// ====================================================

export interface getUnit_getUnit_graphStats {
  __typename: "UnitDetailsGraphStats";
  invocations: string;
  errors: string;
  averageDuration: number;
  dateTime: string;
}

export interface getUnit_getUnit {
  __typename: "UnitDetails";
  unitName: string;
  errorRate: number | null;
  graphStats: getUnit_getUnit_graphStats[];
}

export interface getUnit {
  getUnit: getUnit_getUnit | null;
}

export interface getUnitVariables {
  unitName: string;
  graphSince: string;
}
