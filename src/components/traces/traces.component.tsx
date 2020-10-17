import React, { memo, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import styled from 'styled-components/macro'
import SearchIcon from '@material-ui/icons/Search'
import { useDebounce } from 'react-use'
import { Box, IconButton, InputBase } from '@material-ui/core'

import { TracesCard } from './traces-card.component'
import { Card } from '../cards'
import { FullWidthSpinner } from '../spinners'
import { RefreshButton } from '../button'
import { useTracesData } from '../../hooks'

const StyledInfiniteScroll = styled(InfiniteScroll)`
  width: 100%;
`
const Input = styled(InputBase)`
  flex: 1;
  padding: 10px 16px;
`
const Controls = styled.div`
  display: flex;
  align-items: center;
`
const InputWrapper = styled(Card)`
  display: flex;
  width: 100%;
  margin: 16px 0;
  height: 40px;
`

export interface TracesProps {
  unitErrorId?: string
  unitName?: string
}

export const Traces = memo((props: TracesProps) => {
  const { unitErrorId, unitName } = props
  const [inputValue, setInputValue] = useState('')
  const [search, setSearch] = useState('')
  const {
    traces,
    loading,
    fetchMoreTraces,
    hasMore,
    loadingMore,
    refetch,
    statuses,
    setStatuses,
  } = useTracesData({
    unitErrorId,
    unitName,
    search,
    sessionKey: `@traces-${unitErrorId || unitName}`,
  })

  useDebounce(
    () => {
      if (inputValue !== search) {
        setSearch(inputValue)
      }
    },
    700,
    [inputValue],
  )

  return (
    <StyledInfiniteScroll hasMore={hasMore} loadMore={fetchMoreTraces} threshold={500}>
      <Controls>
        <InputWrapper>
          <Input
            placeholder="Search for a trace id, unit name or a log message"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <IconButton type="submit" aria-label="search">
            <SearchIcon />
          </IconButton>
        </InputWrapper>
        <Box ml={1}>
          <RefreshButton loading={loading} refetch={refetch} />
        </Box>
      </Controls>
      <TracesCard
        traces={traces}
        loading={loading && !loadingMore}
        searchTerm={search}
        setStatuses={setStatuses}
        statuses={statuses}
      />
      {loadingMore && <FullWidthSpinner />}
    </StyledInfiniteScroll>
  )
})
