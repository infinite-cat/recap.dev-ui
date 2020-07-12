import React from 'react'
import {
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

import { Card } from './cards'
import { StatusTag } from '.'
import { getTraces_getTraces_traces as Trace } from '../graphql/queries/types/getTraces'
import { formatDateTime, formatDuration } from '../utils'

const Traces = styled(Table)`
  tr:last-child {
    td {
      border: none;
    }
  }
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
  className?: string
}

export const TracesCard = ({ className, traces }: TracesCardProps) => {
  return (
    <TableContainer component={Card} className={className}>
      <Traces aria-label="traces table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.dataIndex}>{column.title}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {traces?.map((row) => (
            <TableRow key={row.id} hover>
              <TableCell scope="row">
                <MaterialLink to={`/traces/${row.id}`} component={Link}>
                  {row.id}
                </MaterialLink>
              </TableCell>
              <TableCell scope="row">{row.unitName}</TableCell>
              <TableCell>
                <StatusTag status={row.status} />
              </TableCell>
              <TableCell>{formatDuration(row.duration)}</TableCell>
              <TableCell>{formatDateTime(row.start)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Traces>
    </TableContainer>
  )
}
