/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getError
// ====================================================

export interface getError_getError_graphStats {
  __typename: 'UnitErrorDetailsGraphStats'
  invocations: number
  errors: number
  currentErrors: number
  dateTime: string
}

export interface getError_getError {
  __typename: 'UnitErrorDetails'
  id: number
  unitName: string
  type: string
  message: string | null
  rawError: string
  lastEventDateTime: string
  graphStats: getError_getError_graphStats[]
}

export interface getError {
  getError: getError_getError | null
}

export interface getErrorVariables {
  graphSince: string
  id: string
}
