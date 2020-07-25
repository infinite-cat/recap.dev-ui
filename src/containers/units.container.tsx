import React, { useCallback, useContext, useMemo, useState } from 'react'
import styled from 'styled-components/macro'
import {
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
import { useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroller'
import { debounce, isEmpty, round } from 'lodash-es'

import SearchIcon from '@material-ui/icons/Search'

import { GetUnits } from '../graphql/queries'
import { PageHeader, Card, LoadingOverlay, FullWidthSpinner, Result } from '../components'
import { getUnits, getUnits_getUnits_units as Unit } from '../graphql/queries/types/getUnits'
import { DateRangePicker } from '../components/date-range-picker'
import { DateRangeContext } from '../contexts'
import { formatDuration } from '../utils'

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
const Units = styled(Table)``
const StyledInfiniteScroll = styled(InfiniteScroll)`
  width: 100%;
`

const columns = [
  { title: 'Unit Name', dataIndex: 'unitName' as keyof Unit, key: 'unitName' },
  { title: 'Invocations', dataIndex: 'invocations' as keyof Unit, key: 'invocations' },
  { title: 'Errors', dataIndex: 'errors' as keyof Unit, key: 'errors' },
  { title: 'Error Rate', dataIndex: 'errorRate' as keyof Unit, key: 'errorRate' },
  { title: 'Avg. Duration', dataIndex: 'averageDuration' as keyof Unit, key: 'averageDuration' },
  { title: 'Est. Monthly Cost', dataIndex: 'estimatedCost' as keyof Unit, key: 'estimatedCost' },
]

const UnitsContainer = () => {
  const { since, range, setRange } = useContext(DateRangeContext)

  const [search, setSearch] = useState('')
  const [loadingMore, setLoadingMore] = useState(false)
  const { data, loading, fetchMore } = useQuery<getUnits>(GetUnits, {
    variables: {
      since,
      search,
      offset: 0,
      orderBy: 'estimatedCost',
      orderDirection: 'DESC',
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
  }, [loadingMore, fetchMore, data])

  return (
    <PageHeader
      title="Units"
      subTitle="List of all your units"
      actions={<DateRangePicker range={range} onRangeChange={(newRange) => setRange(newRange)} />}
    >
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
          <TableContainer component={Card} style={{ position: 'relative', minHeight: 300 }}>
            {!isEmpty(data?.getUnits?.units) && (
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
                      {row.errorRate !== null && (
                        <TableCell>{round(row.errorRate * 100, 2)}%</TableCell>
                      )}
                      {row.errorRate == null && <TableCell>N/A</TableCell>}
                      {row.averageDuration !== null && (
                        <TableCell>{formatDuration(round(row.averageDuration))}</TableCell>
                      )}
                      {row.averageDuration == null && <TableCell>N/A</TableCell>}
                      {row.estimatedCost !== null && (
                        <TableCell>${round(row.estimatedCost, 2)}</TableCell>
                      )}
                      {row.estimatedCost == null && <TableCell>N/A</TableCell>}
                    </TableRow>
                  ))}
                </TableBody>
              </Units>
            )}
            {isEmpty(data?.getUnits?.units) && !loading && <Result type="empty" />}
            {loading && <LoadingOverlay />}
          </TableContainer>
          {loadingMore && <FullWidthSpinner />}
        </StyledInfiniteScroll>
      </Content>
    </PageHeader>
  )
}

export default UnitsContainer
