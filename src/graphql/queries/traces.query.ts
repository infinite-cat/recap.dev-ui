import { gql } from '@apollo/client'

export const GetTraces = gql`
  query getTraces(
    $search: String
    $offset: Int
    $unitName: String
    $unitErrorId: String
    $statuses: [String!]
  ) {
    getTraces(
      search: $search
      offset: $offset
      unitName: $unitName
      unitErrorId: $unitErrorId
      statuses: $statuses
    ) {
      traces {
        id
        externalId
        unitName
        start
        end
        duration
        status
        logs
        request
        response
        error
        extraData
      }
      offset
      hasMore
    }
  }
`

export const GetTrace = gql`
  query getTrace($id: String!) {
    getTrace(id: $id) {
      id
      externalId
      unitName
      start
      end
      duration
      status
      request
      response
      error
      logs
      extraData
      functionCallEvents {
        start
        end
        functionName
        fileName
      }
      resourceAccessEvents {
        start
        end
        serviceName
        resourceIdentifier
        request
        response
        status
        error
      }
    }
  }
`
