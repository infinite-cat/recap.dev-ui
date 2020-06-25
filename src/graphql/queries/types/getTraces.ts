/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getTraces
// ====================================================

export interface getTraces_getTraces_traces {
  __typename: "Trace";
  id: string;
  unitName: string;
  start: string;
  end: string;
  duration: number;
  status: string;
  logs: string | null;
  request: string;
  response: string | null;
  error: string | null;
}

export interface getTraces_getTraces {
  __typename: "GetTracesResponse";
  traces: getTraces_getTraces_traces[];
  offset: number;
  hasMore: boolean;
}

export interface getTraces {
  getTraces: getTraces_getTraces;
}

export interface getTracesVariables {
  search?: string | null;
  offset?: number | null;
  unitName?: string | null;
  unitErrorId?: string | null;
}
