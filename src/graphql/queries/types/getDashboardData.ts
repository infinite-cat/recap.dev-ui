/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getDashboardData
// ====================================================

export interface getDashboardData_getInsights {
  __typename: "Insight";
  type: string;
  message: string;
  detailsLink: string;
}

export interface getDashboardData_getTotalStats_graphStats {
  __typename: "TotalGraphStats";
  invocations: string;
  errors: string;
  dateTime: string;
}

export interface getDashboardData_getTotalStats {
  __typename: "TotalStats";
  invocations: string;
  errors: string;
  errorRate: number | null;
  graphStats: getDashboardData_getTotalStats_graphStats[];
}

export interface getDashboardData_getNewErrors {
  __typename: "UnitError";
  id: number;
  unitName: string;
  type: string;
  message: string | null;
  rawError: string;
  firstEventDateTime: string;
  lastEventDateTime: string;
}

export interface getDashboardData_getTopInvokedUnits {
  __typename: "TopInvokedUnit";
  unitName: string;
  invocations: string;
  errors: string;
}

export interface getDashboardData {
  getInsights: getDashboardData_getInsights[];
  getTotalStats: getDashboardData_getTotalStats;
  getNewErrors: getDashboardData_getNewErrors[];
  getTopInvokedUnits: getDashboardData_getTopInvokedUnits[];
}

export interface getDashboardDataVariables {
  since: string;
}
