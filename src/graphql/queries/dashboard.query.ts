import { gql } from '@apollo/client'

export const GetDashboardData = gql`
  query getDashboardData($since: String!) {
    getInsights(since: $since) {
      type
      message
      detailsLink
    }
    getTotalStats(since: $since) {
      invocations
      errors
      errorRate
      graphStats {
        invocations
        errors
        dateTime
      }
    }
    getNewErrors(since: $since) {
      id
      unitName
      type
      message
      rawError
      firstEventDateTime
      lastEventDateTime
    }
    getTopInvokedUnits(since: $since) {
      unitName
      estimatedCost
      invocations
      errors
    }
  }
`
