import { ApolloClient, InMemoryCache } from '@apollo/client'

const BASE_URL = process.env.REACT_APP_HTTP_PROXY ?? ''
const IS_DEMO = process.env.REACT_APP_IS_DEMO ?? false

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
