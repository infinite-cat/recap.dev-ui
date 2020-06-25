import { gql } from 'apollo-boost'

export const GetErrors = gql`
  query getErrors($graphSince: String!, $offset: Int) {
    getErrors(graphSince: $graphSince, offset: $offset) {
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
  query getError($graphSince: String!, $id: String!) {
    getError(id: $id) {
      id
      unitName
      type
      message
      rawError
      lastEventDateTime
    }
    getErrorStats(since: $graphSince, id: $id) {
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
