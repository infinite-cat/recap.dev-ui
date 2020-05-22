import React, { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components/macro'
import { IconButton, InputBase } from '@material-ui/core'
import { useQuery } from '@apollo/react-hooks'
import InfiniteScroll from 'react-infinite-scroller'
import { debounce } from 'lodash-es'

import SearchIcon from '@material-ui/icons/Search'

import { GetTraces } from '../graphql/queries'
import { getTraces } from '../graphql/queries/types/getTraces'
import { PageHeader, Card, FullWidthSpinner } from '../components'
import { TracesCard } from '../components/traces-card.component'

const Content = styled.div``
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

const TracesContainer = () => {
  const [search, setSearch] = useState('')
  const [loadingMore, setLoadingMore] = useState(false)
  const { data, loading, fetchMore } = useQuery<getTraces>(GetTraces, {
    variables: {
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
    <PageHeader title="Traces" subTitle="List of all your traces">
      <Content>
        <StyledInfiniteScroll
          hasMore={data?.getTraces.hasMore}
          loadMore={fetchMoreTraces}
          threshold={500}
        >
          <Controls>
            <Input
              placeholder="Search for a trace id or unit name"
              onChange={(e) => debouncedSetSearch(e.target.value)}
            />
            <IconButton type="submit" aria-label="search">
              <SearchIcon />
            </IconButton>
          </Controls>
          {!loading && data && <TracesCard traces={data?.getTraces?.traces} />}
          {(loading || loadingMore) && <FullWidthSpinner />}
        </StyledInfiniteScroll>
      </Content>
    </PageHeader>
  )
}

export default TracesContainer
