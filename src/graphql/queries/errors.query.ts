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
    getError(graphSince: $graphSince, id: $id) {
      id
      unitName
      type
      message
      rawError
      lastEventDateTime
      graphStats {
        invocations
        errors
        currentErrors
        dateTime
      }
    }
  }
`
