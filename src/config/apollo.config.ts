import { ApolloClient, InMemoryCache } from '@apollo/client'
import { BASE_URL, IS_DEMO } from '../constants'

export const getApolloClient = async () => {
  if (IS_DEMO) {
    const { mockClient } = await import('../__mocks__/client')
    return mockClient
  }

  return new ApolloClient({
    uri: `${BASE_URL}/graphql`,
    cache: new InMemoryCache(),
  })
}
