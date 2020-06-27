import React, { useCallback, useMemo, useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import InfiniteScroll from 'react-infinite-scroller'
import styled from 'styled-components/macro'
import SearchIcon from '@material-ui/icons/Search'
import { debounce } from 'lodash-es'
import { IconButton, InputBase } from '@material-ui/core'

import { getTraces } from '../../graphql/queries/types/getTraces'
import { GetTraces } from '../../graphql/queries'
import { TracesCard } from '../traces-card.component'
import { FullWidthSpinner } from '../spinners'
import { Card } from '../cards'

const Input = styled(InputBase)`
  flex: 1;
  padding: 10px 16px;
`
const Controls = styled(Card)`
  display: flex;
  width: 100%;
  margin: 16px 0;
`
const StyledInfiniteScroll = styled(InfiniteScroll)`
  width: 100%;
`

export interface TracesProps {
  unitErrorId?: string
  unitName?: string
}

export const Traces = ({ unitErrorId, unitName }: TracesProps) => {
  const [search, setSearch] = useState('')
  const [loadingMore, setLoadingMore] = useState(false)
  const { data, loading, fetchMore } = useQuery<getTraces>(GetTraces, {
    variables: {
      unitErrorId,
      unitName,
      search,
      offset: 0,
    },
  })

  const debouncedSetSearch = useMemo(
    () =>
      debounce((newSearch: string) => {
        setSearch(newSearch)
      }, 500),
    [setSearch],
  )

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
        if (!fetchMoreResult) {
          return prev
        }

        return {
          ...prev,
          getTraces: {
            ...prev?.getTraces,
            traces: [...prev.getTraces.traces, ...fetchMoreResult.getTraces.traces],
            offset: fetchMoreResult.getTraces.offset,
            hasMore: fetchMoreResult.getTraces.hasMore,
          },
        }
      },
    }).then(() => {
      setLoadingMore(false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingMore, fetchMore, data])

  return (
    <StyledInfiniteScroll
      hasMore={data?.getTraces.hasMore}
      loadMore={fetchMoreTraces}
      threshold={500}
    >
      <Controls>
        <Input
          placeholder="Search for a trace id, unit name or a log message"
          onChange={(e) => debouncedSetSearch(e.target.value)}
        />
        <IconButton type="submit" aria-label="search">
          <SearchIcon />
        </IconButton>
      </Controls>
      {!loading && data && <TracesCard traces={data?.getTraces?.traces} />}
      {(loading || loadingMore) && <FullWidthSpinner />}
    </StyledInfiniteScroll>
  )
}
