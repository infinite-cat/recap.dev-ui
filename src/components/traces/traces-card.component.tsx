/* eslint-disable react/no-array-index-key */
import React from 'react'
import {
  Box,
  Link as MaterialLink,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import { flatten, isEmpty } from 'lodash-es'

import { Card } from '../cards'
import { HighlightedText, LoadingOverlay, Result, StatusTag } from '../index'
import { getTraces_getTraces_traces as Trace } from '../../graphql/queries/types/getTraces'
import { formatDateTime, formatDuration, getMatches, safeParse } from '../../utils'
import { LogType } from '../logs/log.component'

const Wrapper: typeof TableContainer = styled(({ loading, ...props }) => (
  <TableContainer {...props} />
))<{ loading: boolean }>`
  min-height: ${(p) => (p.loading ? '300px' : 'auto')};
  position: relative;
`
const Traces = styled(Table)`
  tr:last-child {
    td {
      border: none;
    }
  }
`
const LogsWrapper = styled.div`
  padding: 0 20px;
  max-height: 150px;
  overflow-y: auto;
`
const LogsTitle = styled.div`
  padding: 0 20px;
  margin-bottom: 10px;
`

const columns = [
  { title: 'Request Id', dataIndex: 'id' as keyof Trace, key: 'id' },
  { title: 'Unit Name', dataIndex: 'unitName' as keyof Trace, key: 'id' },
  { title: 'Status', dataIndex: 'status' as keyof Trace, key: 'id' },
  { title: 'Duration', dataIndex: 'duration' as keyof Trace, key: 'id' },
  { title: 'Time', dataIndex: 'start' as keyof Trace, key: 'id' },
]

interface TracesCardProps {
  traces?: Trace[]
  searchTerm?: string
  className?: string
  loading?: boolean
}

export const TracesCard = ({ className, traces, loading, searchTerm }: TracesCardProps) => {
  return (
    <Wrapper component={Card} className={className} loading={loading && isEmpty(traces)}>
      {loading && <LoadingOverlay />}
      {!loading && isEmpty(traces) && <Result type="empty" />}
      {!isEmpty(traces) && (
        <Traces aria-label="traces table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.dataIndex}>{column.title}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {traces?.map((row) => {
              let logs: string[] = []
              if (searchTerm && !loading) {
                const parsedLogs = safeParse(row?.logs) ?? []
                logs = flatten(
                  parsedLogs
                    .filter((log: LogType) => log.message?.includes(searchTerm))
                    .map((log: LogType) => getMatches(log.message, searchTerm)),
                )
              }
              return (
                <React.Fragment key={row.id}>
                  <TableRow hover>
                    <TableCell scope="row">
                      <MaterialLink to={`/traces/${row.id}`} component={Link}>
                        <HighlightedText text={row.externalId} highlight={searchTerm} />
                      </MaterialLink>
                    </TableCell>
                    <TableCell scope="row">{row.unitName}</TableCell>
                    <TableCell>
                      <StatusTag status={row.status} />
                    </TableCell>
                    <TableCell>{formatDuration(row.duration)}</TableCell>
                    <TableCell>{formatDateTime(row.start)}</TableCell>
                  </TableRow>
                  {!isEmpty(logs) && (
                    <TableRow>
                      <TableCell colSpan={5}>
                        <LogsTitle>Found search term in logs (first 10 matches): </LogsTitle>
                        <LogsWrapper>
                          {logs.slice(0, 10).map((log, index) => (
                            <Box key={index} mb={2}>
                              <HighlightedText text={log} highlight={searchTerm} />
                            </Box>
                          ))}
                        </LogsWrapper>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              )
            })}
          </TableBody>
        </Traces>
      )}
    </Wrapper>
  )
}
