import { ApolloClient, InMemoryCache } from '@apollo/client'
import { loader } from 'graphql.macro'
import { SchemaLink } from '@apollo/client/link/schema'
import { makeExecutableSchema } from '@graphql-tools/schema'

import resolvers from './resolvers'

const typeDefs = loader('../../schema.graphql')

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: 'ignore',
  },
})

export const mockClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: new SchemaLink({ schema }),
})
