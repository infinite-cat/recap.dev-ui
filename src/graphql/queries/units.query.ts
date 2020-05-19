import { gql } from 'apollo-boost'

export const GetUnits = gql`
  query getUnits($search: String, $offset: Int, $since: String!) {
    getUnits(search: $search, offset: $offset, since: $since) {
      units {
        unitName
        invocations
        errors
        errorRate
        averageDuration
      }
      offset
      hasMore
    }
  }
`
