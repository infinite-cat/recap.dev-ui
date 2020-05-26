import React, { useCallback, useState } from 'react'
import styled from 'styled-components/macro'
import {
  Table,
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
import { isEmpty } from 'lodash-es'

import {
  PageHeader,
  Card,
  ErrorsListGraph,
  Empty,
  LoadingOverlay,
  FullWidthSpinner,
} from '../components'
import { getErrors_getErrors_errors as Error, getErrors } from '../graphql/queries/types/getErrors'
import { GetErrors } from '../graphql/queries'
import { formatDateTime } from '../utils'

const Content = styled.div`
  padding-top: 16px;
`
const Errors = styled(Table)``
const StyledInfiniteScroll = styled(InfiniteScroll)`
  width: 100%;
`
const NoBreakTableCell = styled(TableCell)`
  white-space: nowrap;
`
const ErrorMessage = styled.div`
  word-break: break-all;
  word-wrap: break-word;
`

const columns = [
  { title: 'Error', dataIndex: 'id' as keyof Error, key: 'id' },
  { title: 'Unit Name', dataIndex: 'unitName' as keyof Error, key: 'id' },
  { title: 'Graph', dataIndex: 'graphStats' as keyof Error, key: 'id' },
  { title: 'Last Seen', dataIndex: 'lastEventDateTime' as keyof Error, key: 'id' },
]

const ErrorsListContainer = () => {
  const [graphSince] = useState(
    DateTime.utc().minus({ hours: 23 }).startOf('hour').toMillis().toString(),
  )

  const [loadingMore, setLoadingMore] = useState(false)
  const { data, loading, fetchMore } = useQuery<getErrors>(GetErrors, {
    variables: {
      graphSince,
      offset: 0,
    },
  })

  const fetchMoreErrors = useCallback(() => {
    if (loadingMore) {
      return
    }

    setLoadingMore(true)

    fetchMore({
      variables: {
        offset: data?.getErrors?.offset,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return prev
        }

        return {
          ...prev,
          getErrors: {
            ...prev?.getErrors,
            errors: [...prev.getErrors.errors, ...fetchMoreResult.getErrors.errors],
            offset: fetchMoreResult.getErrors.offset,
            hasMore: fetchMoreResult.getErrors.hasMore,
          },
        }
      },
    }).then(() => {
      setLoadingMore(false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingMore, fetchMore, data])

  return (
    <PageHeader title="Errors" subTitle="List of all errors in your units">
      <Content>
        <StyledInfiniteScroll
          hasMore={data?.getErrors.hasMore}
          loadMore={fetchMoreErrors}
          threshold={500}
        >
          <TableContainer component={Card} style={{ position: 'relative', minHeight: 300 }}>
            {!isEmpty(data?.getErrors?.errors) && (
              <Errors aria-label="errors table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell key={column.dataIndex}>{column.title}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.getErrors?.errors?.map((row) => (
                    <TableRow key={row.id} hover>
                      <TableCell scope="row">
                        <MaterialLink to={`/errors/${row.id}`} component={Link}>
                          <div>{row.type}</div>
                          <ErrorMessage>{row.message}</ErrorMessage>
                        </MaterialLink>
                      </TableCell>
                      <NoBreakTableCell scope="row">{row.unitName}</NoBreakTableCell>
                      <NoBreakTableCell>
                        <ErrorsListGraph data={row.graphStats} />
                      </NoBreakTableCell>
                      <NoBreakTableCell>{formatDateTime(row.lastEventDateTime)}</NoBreakTableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Errors>
            )}
            {isEmpty(data?.getErrors?.errors) && !loading && <Empty />}
            {loading && <LoadingOverlay />}
          </TableContainer>
          {loadingMore && <FullWidthSpinner />}
        </StyledInfiniteScroll>
      </Content>
    </PageHeader>
  )
}

export default ErrorsListContainer
