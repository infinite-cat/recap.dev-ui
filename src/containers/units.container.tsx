import React, { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components/macro'
import {
  CircularProgress,
  Table,
  IconButton,
  InputBase,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Link as MaterialLink,
} from '@material-ui/core'
import { useQuery } from '@apollo/react-hooks'
import { DateTime } from 'luxon'
import { Link } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroller'
import { debounce } from 'lodash-es'

import SearchIcon from '@material-ui/icons/Search'

import { GetUnits } from '../graphql/queries'
import { PageHeader, Card } from '../components'
import { getUnits, getUnits_getUnits_units as Unit } from '../graphql/queries/types/getUnits'

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
const Units = styled(Table)`
  tr:last-child {
    td {
      border: none;
    }
  }
`
const StyledInfiniteScroll = styled(InfiniteScroll)`
  width: 100%;
`

const columns = [
  { title: 'Unit Name', dataIndex: 'unitName' as keyof Unit, key: 'unitName' },
  { title: 'Invocations', dataIndex: 'invocations' as keyof Unit, key: 'invocations' },
  { title: 'Errors', dataIndex: 'errors' as keyof Unit, key: 'errors' },
  { title: 'Error Rate', dataIndex: 'errorRate' as keyof Unit, key: 'errorRate' },
  { title: 'Avg. Duration', dataIndex: 'averageDuration' as keyof Unit, key: 'averageDuration' },
]

const UnitsContainer = () => {
  const [since] = useState(
    DateTime.utc().minus({ days: 6, hours: 23 }).startOf('hour').toMillis().toString(),
  )
  const [search, setSearch] = useState('')
  const [loadingMore, setLoadingMore] = useState(false)
  const { data, loading, fetchMore } = useQuery<getUnits>(GetUnits, {
    variables: {
      since,
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

  const fetchMoreUnits = useCallback(() => {
    if (loadingMore) {
      return
    }

    setLoadingMore(true)

    fetchMore({
      variables: {
        offset: data?.getUnits?.offset,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return prev
        }

        return {
          ...prev,
          getUnits: {
            ...prev?.getUnits,
            units: [...prev.getUnits.units, ...fetchMoreResult.getUnits.units],
            offset: fetchMoreResult.getUnits.offset,
            hasMore: fetchMoreResult.getUnits.hasMore,
          },
        }
      },
    }).then(() => {
      setLoadingMore(false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingMore, fetchMore, data])

  return (
    <PageHeader title="Units" subTitle="List of all your units">
      <Content>
        <StyledInfiniteScroll
          hasMore={data?.getUnits.hasMore}
          loadMore={fetchMoreUnits}
          threshold={500}
        >
          <Controls>
            <Input
              placeholder="Search for a unit name"
              onChange={(e) => debouncedSetSearch(e.target.value)}
            />
            <IconButton type="submit" aria-label="search">
              <SearchIcon />
            </IconButton>
          </Controls>
          {!loading && data && (
            <TableContainer component={Card}>
              <Units aria-label="units table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell key={column.dataIndex}>{column.title}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.getUnits?.units?.map((row) => (
                    <TableRow key={row.unitName} hover>
                      <TableCell scope="row">
                        <MaterialLink to={`/units/${row.unitName}`} component={Link}>
                          {row.unitName}
                        </MaterialLink>
                      </TableCell>
                      <TableCell>{row.invocations}</TableCell>
                      <TableCell>{row.errors}</TableCell>
                      <TableCell>{row.errorRate}</TableCell>
                      <TableCell>{row.averageDuration} ms</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Units>
            </TableContainer>
          )}
          {(loading || loadingMore) && <CircularProgress />}
        </StyledInfiniteScroll>
      </Content>
    </PageHeader>
  )
}

export default UnitsContainer
