import React, { memo, useCallback, useMemo, useState } from 'react'
import { useQuery } from '@apollo/client'
import InfiniteScroll from 'react-infinite-scroller'
import styled from 'styled-components/macro'
import SearchIcon from '@material-ui/icons/Search'
import { debounce, isEmpty } from 'lodash-es'
import { IconButton, InputBase } from '@material-ui/core'

import { getTraces } from '../../graphql/queries/types/getTraces'
import { GetTraces } from '../../graphql/queries'
import { TracesCard } from '../traces-card.component'
import { Card } from '../cards'
import { FullWidthSpinner } from '../spinners'

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
  externalSearch?: string
  setExternalTerm?: (searchTerm: string) => void
}

export const Traces = memo(
  ({ unitErrorId, unitName, externalSearch, setExternalTerm }: TracesProps) => {
    const [search, setSearch] = useState('')
    const [loadingMore, setLoadingMore] = useState(false)
    const { data, loading, fetchMore } = useQuery<getTraces>(GetTraces, {
      variables: {
        unitErrorId,
        unitName,
        search: externalSearch || search,
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

    return (
      <StyledInfiniteScroll
        hasMore={data?.getTraces.hasMore}
        loadMore={fetchMoreTraces}
        threshold={500}
      >
        <Controls>
          <Input
            placeholder="Search for a trace id, unit name or a log message"
            value={externalSearch || search}
            onChange={(e) => {
              if (setExternalTerm) {
                return setExternalTerm(e.target.value)
              }
              return debouncedSetSearch(e.target.value)
            }}
          />
          <IconButton type="submit" aria-label="search">
            <SearchIcon />
          </IconButton>
        </Controls>
        <TracesCard traces={traces} loading={loading} searchTerm={externalSearch || search} />
        {loadingMore && <FullWidthSpinner />}
      </StyledInfiniteScroll>
    )
  },
)
