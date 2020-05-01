import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import ApolloClient from 'apollo-client'

export const getApolloClient = () => {
  const cache = new InMemoryCache()

  const link = createHttpLink({ uri: '/graphql' })

  return new ApolloClient({ cache, link })
}
