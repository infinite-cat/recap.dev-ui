import { gql } from '@apollo/client'

export const GetSettings = gql`
  query getSettings {
    getSettings {
      id
      isAwsIntegrationEnabled
      host
      cleanupAfterDays
      notificationConfigurations
    }
  }
`
