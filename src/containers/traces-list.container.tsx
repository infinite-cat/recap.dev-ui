import React, { useCallback, useState } from 'react'
import { PageHeader, Row, Spin, Table, Input } from 'antd'
import { useQuery } from '@apollo/react-hooks'
import { DateTime } from 'luxon'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroller'
import { debounce } from 'lodash'

import { GetTraces } from '../graphql/queries'
import { getTraces } from '../graphql/queries/types/getTraces'
import { ExecutionStatusTag } from '../components'

const { Search } = Input

const Content = styled(Row)`

`
const Controls = styled.div`
  margin: 16px 0;
  width: 100%;
`

const StyledTable = styled(Table)`
  width: 100%;
`
const StyledInfiniteScroll = styled(InfiniteScroll)`
  width: 100%;
`

const columns = [{
  title: 'Request Id',
  dataIndex: 'id',
  key: 'id',
  render: (id: string) => <Link to={`/traces/${id}`}>{id}</Link>,
}, {
  title: 'Unit Name',
  dataIndex: 'unitName',
  key: 'id',
}, {
  title: 'Status',
  dataIndex: 'status',
  key: 'id',
  render: (status: string) => <ExecutionStatusTag status={status} />,
}, {
  title: 'Duration',
  dataIndex: 'duration',
  key: 'id',
  render: (duration: number) => `${duration} ms`,
}, {
  title: 'Time',
  dataIndex: 'start',
  key: 'id',
  render: (time: string) => DateTime.fromMillis(Number(time)).toISO(),
}]

export const TracesList = () => {
  const [search, setSearch] = useState('')
  const [loadingMore, setLoadingMore] = useState(false)
  const { data, loading, fetchMore } = useQuery<getTraces>(GetTraces, {
    variables: {
      search,
      offset: 0,
    },
  })

  const debouncedSetSearch = useCallback(debounce((newSearch: string) => {
    setSearch(newSearch)
  }, 500), [])

  const fetchMoreTraces = useCallback(() => {
    if (loadingMore) {
      return
    }

    setLoadingMore(true)

    return fetchMore({
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
            ...prev.getTraces,
            traces: [...prev.getTraces.traces, ...fetchMoreResult.getTraces.traces],
            offset: fetchMoreResult.getTraces.offset,
            hasMore: fetchMoreResult.getTraces.hasMore,
          },
        }
      },
    }).then(() => {
      setLoadingMore(false)
    })
  }, [loadingMore, data])

  return (
    <PageHeader
      title="Traces"
      subTitle="List of all your traces"
    >
      <Content>
        <StyledInfiniteScroll
          hasMore={data?.getTraces.hasMore}
          loadMore={fetchMoreTraces}
          threshold={500}
        >
          <Controls>
            <Search
              placeholder="Search for a trace id or unit name"
              onSearch={(value) => setSearch(value)}
              onChange={(e) => debouncedSetSearch(e.target.value)}
              loading={loadingMore || loading}
              enterButton
            />
          </Controls>
          {!loading && data
          && (
          <StyledTable
            rowKey="id"
            pagination={false}
            dataSource={data?.getTraces?.traces}
            columns={columns}
          />
          )}
          {(loading || loadingMore) && <Spin />}
        </StyledInfiniteScroll>
      </Content>
    </PageHeader>
  )
}
