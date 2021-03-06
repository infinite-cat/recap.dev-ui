import { useCallback, useState } from 'react'
import { isEmpty } from 'lodash-es'
import { useQuery } from '@apollo/client'
import { useSessionStorage } from 'react-use'

import { getTraces } from '../graphql/queries/types/getTraces'
import { GetTraces } from '../graphql/queries'

interface useTracesDataProps {
  unitErrorId?: string
  unitName?: string
  search?: string
  sessionKey: string
  pollInterval?: number
  to?: string | null
  from?: string
}

export const useTracesData = (props: useTracesDataProps) => {
  const { unitErrorId, unitName, search, pollInterval, sessionKey, to, from } = props
  const [statuses, setStatuses] = useSessionStorage<string[]>(sessionKey, [])
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
      to,
      from,
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
