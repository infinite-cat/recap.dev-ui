/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getTrace
// ====================================================

export interface getTrace_getTrace_functionCallEvents {
  __typename: "FunctionCall";
  start: string;
  end: string | null;
  functionName: string;
  fileName: string;
}

export interface getTrace_getTrace_resourceAccessEvents {
  __typename: "ResourceAccessEvent";
  start: string;
  end: string | null;
  serviceName: string;
  resourceIdentifier: string | null;
  request: string;
  response: string;
  status: string;
  error: string | null;
}

export interface getTrace_getTrace {
  __typename: "Trace";
  id: string;
  unitName: string;
  start: string;
  end: string;
  duration: number;
  status: string;
  request: string;
  response: string | null;
  error: string | null;
  functionCallEvents: getTrace_getTrace_functionCallEvents[];
  resourceAccessEvents: getTrace_getTrace_resourceAccessEvents[];
}

export interface getTrace {
  getTrace: getTrace_getTrace | null;
}

export interface getTraceVariables {
  id: string;
}
