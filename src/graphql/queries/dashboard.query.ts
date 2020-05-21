import { gql } from 'apollo-boost'

export const GetDashboardData = gql`
  query getDashboardData($since: String!) {
    getInsights(since: $since) {
      message
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
    getNewestErrors(since: $since) {
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
      invocations
      errors
    }
  }
`
