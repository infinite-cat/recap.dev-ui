import { ApolloClient, InMemoryCache } from '@apollo/client'

export const getApolloClient = () => {
  return new ApolloClient({
    uri: '/graphql',
    cache: new InMemoryCache(),
  })
}
