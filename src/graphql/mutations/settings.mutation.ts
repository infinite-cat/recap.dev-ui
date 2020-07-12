import { gql } from 'apollo-boost'

export const SetSettings = gql`
  mutation setSettings($settings: SettingsInput!) {
    setSettings(settings: $settings) {
      id
      isAwsIntegrationEnabled
      host
      notificationConfigurations
    }
  }
`

export const TestAwsIntegration = gql`
  mutation testAwsIntegration {
    testAwsIntegration {
      success
      error
    }
  }
`

export const TestSlackIntegration = gql`
  mutation testSlackIntegration($channelId: String!, $token: String!) {
    testSlackIntegration(channelId: $channelId, token: $token) {
      success
      error
    }
  }
`
