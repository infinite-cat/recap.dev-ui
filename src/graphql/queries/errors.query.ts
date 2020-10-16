import { gql } from '@apollo/client'

export const GetErrors = gql`
  query getErrors($from: String!, $to: String, $offset: Int) {
    getErrors(from: $from, to: $to, offset: $offset) {
      errors {
        id
        unitName
        type
        message
        lastEventDateTime
        graphStats {
          value
          dateTime
        }
      }
      offset
      hasMore
    }
  }
`

export const GetError = gql`
  query getError($from: String!, $to: String, $id: String!) {
    getError(id: $id) {
      id
      unitName
      type
      message
      rawError
      lastEventDateTime
    }
    getErrorStats(from: $from, to: $to, id: $id) {
      invocations
      errors
      currentErrors
      dateTime
    }
    getTraces(unitErrorId: $id, limit: 1) {
      traces {
        id
        logs
      }
    }
  }
`
