import * as GraphQLJSON from 'graphql-type-json'
import { filter, find, flow, take, partialRight } from 'lodash-es'
import {
  units,
  unitDetails,
  traces,
  errorList,
  insights,
  totalSystemStats,
  newErrors,
  topInvokedUnits,
  errorStats,
  errors,
  settings,
} from './data'

export default {
  JSON: GraphQLJSON,
  Query: {
    getUnits: (_: any, args: any) => ({
      hasMore: false,
      offset: 20,
      units: args.search ? filter(units, (unit) => unit.unitName.includes(args.search)) : units,
      __typename: 'GetUnitsResponse',
    }),
    getUnit: (_: any, args: any) => find(unitDetails, { unitName: args.unitName }),
    getTraces: (_: any, args: any) => ({
      hasMore: false,
      offset: 20,
      traces: flow(
        partialRight(filter, (trace: any) => {
          if (
            args.search &&
            !trace.unitName.includes(args.search) &&
            !trace.logs.includes(args.search)
          ) {
            return false
          }

          if (args.unitErrorId && Number(args.unitErrorId) !== trace.unitErrorId) {
            return false
          }

          return !(args.unitName && args.unitName !== trace.unitName)
        }),
        partialRight(take, args.limit || 20),
      )(traces),
      __typename: 'GetTracesResponse',
    }),
    getTrace(_: any, { id }: any) {
      return find(traces, { id: Number(id) })
    },
    getErrors: () => ({
      hasMore: false,
      offset: 20,
      errors: errorList,
    }),
    getError(_: any, { id }: any) {
      return find(errors, { id: Number(id) })
    },
    getErrorStats: (_: any, { id }: any) => errorStats[id],
    getInsights: () => insights,
    getTotalStats: () => totalSystemStats,
    getNewErrors: () => newErrors,
    getTopInvokedUnits: () => topInvokedUnits,
    getSettings: () => settings,
  },
  Mutation: {
    setSettings: () => settings,
    testAwsIntegration: () => ({
      success: true,
    }),
    testSlackIntegration: () => ({
      success: true,
    }),
  },
}
