import { gql } from '@apollo/client'

export const GetDashboardData = gql`
  query getDashboardData($from: String!, $to: String!) {
    getInsights(from: $from, to: $to) {
      type
      message
      detailsLink
    }
    getTotalStats(from: $from, to: $to) {
      invocations
      errors
      errorRate
      graphStats {
        invocations
        errors
        dateTime
      }
    }
    getNewErrors(from: $from, to: $to) {
      id
      unitName
      type
      message
      rawError
      firstEventDateTime
      lastEventDateTime
    }
    getTopInvokedUnits(from: $from, to: $to) {
      unitName
      estimatedCost
      invocations
      errors
    }
  }
`
