import { gql } from 'apollo-boost'

export const setAwsIntegration = gql`
  mutation setAwsIntegration($enabled: Boolean!) {
    setAwsIntegration(enabled: $enabled) {
      id
      isAwsIntegrationEnabled
    }
  }
`

export const testAwsIntegration = gql`
  mutation testAwsIntegration {
    testAwsIntegration {
      success
      error
    }
  }
`
