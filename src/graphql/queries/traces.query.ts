import { gql } from 'apollo-boost'

export const GetTraces = gql`
  query getTraces($search: String, $offset: Int, $unitName: String, $unitErrorId: String) {
    getTraces(search: $search, offset: $offset, unitName: $unitName, unitErrorId: $unitErrorId) {
      traces {
        id
        unitName
        start
        end
        duration
        status
        logs
        request
        response
        error
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
      unitName
      start
      end
      duration
      status
      request
      response
      error
      logs
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
