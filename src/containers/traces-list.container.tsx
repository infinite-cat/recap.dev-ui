import React, { useCallback, useState } from 'react'
import styled from 'styled-components/macro'
import {
  CircularProgress, Table, IconButton, InputBase, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Link as MaterialLink,
} from '@material-ui/core'
import { useQuery } from '@apollo/react-hooks'
import { DateTime } from 'luxon'
import { Link } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroller'
import { debounce } from 'lodash-es'

import SearchIcon from '@material-ui/icons/Search'

import { GetTraces } from '../graphql/queries'
import { getTraces, getTraces_getTraces_traces as Trace } from '../graphql/queries/types/getTraces'
import { ExecutionStatusTag, PageHeader } from '../components'

const Content = styled.div`
`
const Input = styled(InputBase)`
  flex: 1;
  padding: 10px 16px;
`
const Controls = styled(Paper)`
  display: flex;
  width: 100%;
  margin: 16px 0;
`
const StyledInfiniteScroll = styled(InfiniteScroll)`
  width: 100%;
`

const columns = [
  { title: 'Request Id', dataIndex: 'id' as keyof Trace, key: 'id' },
  { title: 'Unit Name', dataIndex: 'unitName' as keyof Trace, key: 'id' },
  { title: 'Status', dataIndex: 'status' as keyof Trace, key: 'id' },
  { title: 'Duration', dataIndex: 'duration' as keyof Trace, key: 'id' },
  { title: 'Time', dataIndex: 'start' as keyof Trace, key: 'id' },
]

const TracesListContainer = () => {
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
  }, [loadingMore, fetchMore, data])

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
            <Input
              placeholder="Search for a trace id or unit name"
              onChange={(e) => debouncedSetSearch(e.target.value)}
            />
            <IconButton type="submit" aria-label="search">
              <SearchIcon />
            </IconButton>
          </Controls>
          {!loading && data && (
            <TableContainer component={Paper}>
              <Table aria-label="traces table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell key={column.dataIndex}>{column.title}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.getTraces?.traces?.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        <MaterialLink to={`/traces/${row.id}`} component={Link}>{row.id}</MaterialLink>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.unitName}
                      </TableCell>
                      <TableCell><ExecutionStatusTag status={row.status} /></TableCell>
                      <TableCell>{row.duration} ms</TableCell>
                      <TableCell>{DateTime.fromMillis(Number(row.start)).toISO()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          {(loading || loadingMore) && <CircularProgress />}
        </StyledInfiniteScroll>
      </Content>
    </PageHeader>
  )
}

export default TracesListContainer
