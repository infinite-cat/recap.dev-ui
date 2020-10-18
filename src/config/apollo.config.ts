import { ApolloClient, InMemoryCache } from '@apollo/client'

const BASE_URL = process.env.REACT_APP_HTTP_PROXY ?? ''

export const getApolloClient = () => {
  return new ApolloClient({
    uri: `${BASE_URL}/graphql`,
    cache: new InMemoryCache(),
  })
}
