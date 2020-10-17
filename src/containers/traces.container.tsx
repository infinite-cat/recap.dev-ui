import React, { useContext, useState } from 'react'
import styled from 'styled-components/macro'
import { useHistory, useLocation } from 'react-router-dom'
import { useDebounce, useLocalStorage } from 'react-use'
import { IconButton, InputBase } from '@material-ui/core'
import InfiniteScroll from 'react-infinite-scroller'

import SearchIcon from '@material-ui/icons/Search'

import { Card, FullWidthSpinner, PageHeader, TracesCard, DefaultPageActions } from '../components'
import { useTracesData } from '../hooks'
import { DateRangeContext } from '../contexts'

const Content = styled.div``
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

const TracesContainer = () => {
  const [pollInterval, setPollInterval] = useLocalStorage<number>('@auto-update-traces', 0)
  const { from, to, rangeValue, setRangeValue } = useContext(DateRangeContext)

  const location = useLocation()
  const searchTerm = new URLSearchParams(location.search).get('query') ?? ''
  const history = useHistory()
  const [query, setQuery] = useState(searchTerm)

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
    pollInterval,
    search: query,
    to,
    from,
    sessionKey: '@tracesContainer-traces',
  })

  useDebounce(
    () => {
      if (query !== searchTerm) {
        history.push(`/traces?query=${query}`)
      }
    },
    700,
    [query],
  )

  return (
    <PageHeader
      title="Traces"
      subTitle="List of all your traces"
      actions={
        <DefaultPageActions
          pollInterval={pollInterval}
          setPollInterval={setPollInterval}
          rangeValue={rangeValue}
          setRangeValue={setRangeValue}
          loading={loading}
          refetch={refetch}
        />
      }
    >
      <Content>
        <StyledInfiniteScroll hasMore={hasMore} loadMore={fetchMoreTraces} threshold={500}>
          <Controls>
            <InputWrapper>
              <Input
                placeholder="Search for a trace id, unit name or a log message"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <IconButton type="submit" aria-label="search">
                <SearchIcon />
              </IconButton>
            </InputWrapper>
          </Controls>
          <TracesCard
            traces={traces}
            loading={loading && !loadingMore}
            searchTerm={query}
            statuses={statuses}
            setStatuses={setStatuses}
          />
          {loadingMore && <FullWidthSpinner />}
        </StyledInfiniteScroll>
      </Content>
    </PageHeader>
  )
}

export default TracesContainer
