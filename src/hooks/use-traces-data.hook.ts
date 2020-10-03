import React, { useCallback, useState } from 'react'
import { isEmpty } from 'lodash-es'
import { useQuery } from '@apollo/client'

import { getTraces } from '../graphql/queries/types/getTraces'
import { GetTraces } from '../graphql/queries'

interface useTracesDataProps {
  unitErrorId?: string
  unitName?: string
  search?: string
  pollInterval?: number
}

export const useTracesData = (props: useTracesDataProps) => {
  const { unitErrorId, unitName, search, pollInterval } = props
  const [statuses, setStatuses] = React.useState<string[]>([])
  const [loadingMore, setLoadingMore] = useState(false)
  const { data, loading, fetchMore, refetch } = useQuery<getTraces>(GetTraces, {
    pollInterval: pollInterval || 0,
    notifyOnNetworkStatusChange: true,
    variables: {
      unitErrorId,
      unitName,
      search: search || '',
      statuses,
      onlyErrors: false,
      offset: 0,
    },
  })

  const fetchMoreTraces = useCallback(() => {
    if (loadingMore) {
      return
    }

    setLoadingMore(true)

    fetchMore({
      variables: {
        offset: data?.getTraces?.offset,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        const newTraces = [
          ...(prev?.getTraces?.traces ?? []),
          ...(fetchMoreResult?.getTraces?.traces ?? []),
        ]

        if (!fetchMoreResult || isEmpty(newTraces)) {
          return prev
        }

        return {
          ...prev,
          getTraces: {
            ...prev?.getTraces,
            traces: newTraces,
            offset: fetchMoreResult.getTraces.offset,
            hasMore: fetchMoreResult.getTraces.hasMore,
          },
        }
      },
    }).then(() => {
      setLoadingMore(false)
    })
  }, [loadingMore, fetchMore, data])

  const traces = data?.getTraces?.traces
  const hasMore = data?.getTraces?.hasMore
  return { traces, fetchMoreTraces, loading, hasMore, loadingMore, statuses, setStatuses, refetch }
}
