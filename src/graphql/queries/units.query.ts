import { gql } from '@apollo/client'

export const GetUnits = gql`
  query getUnits($search: String, $offset: Int, $since: String!) {
    getUnits(search: $search, offset: $offset, since: $since) {
      units {
        unitName
        estimatedCost
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

export const GetUnit = gql`
  query getUnit($unitName: String!, $graphSince: String!) {
    getUnit(unitName: $unitName, graphSince: $graphSince) {
      unitName
      estimatedCost
      errorRate
      graphStats {
        invocations
        errors
        averageDuration
        dateTime
      }
    }
  }
`
