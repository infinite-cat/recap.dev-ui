import { gql } from 'apollo-boost'

export const GetSettings = gql`
  query getSettings {
    getSettings {
      id
      isAwsIntegrationEnabled
    }
  }
`
