import { gql } from '@apollo/client'

export const GetUnits = gql`
  query getUnits(
    $search: String
    $offset: Int
    $from: String!
    $to: String
    $orderBy: String
    $orderDirection: String
  ) {
    getUnits(
      search: $search
      offset: $offset
      from: $from
      to: $to
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
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
  query getUnit($unitName: String!, $from: String!, $to: String) {
    getUnit(unitName: $unitName, from: $from, to: $to) {
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
