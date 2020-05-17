import React, { useState } from 'react'
import {
  Link as MaterialLink,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@material-ui/core'
import { useParams, useHistory, Link } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { DateTime } from 'luxon'

import styled from 'styled-components/macro'
import { GetError, GetTraces } from '../../graphql/queries'
import { Card, LoadingPage, PageHeader, StatusTag } from '../../components'
import { Content, TopCardsContainer, BasicInfoCard } from './error.styles'
import { getError } from '../../graphql/queries/types/getError'
import {
  getTraces,
  getTraces_getTraces_traces as Trace,
} from '../../graphql/queries/types/getTraces'

const breadcrumb = (errorName: string = '') => ({
  routes: [
    {
      path: '/errors',
      breadcrumbName: 'Errors',
    },
    {
      breadcrumbName: errorName,
    },
  ],
})

const columns = [
  { title: 'Request Id', dataIndex: 'id' as keyof Trace, key: 'id' },
  { title: 'Unit Name', dataIndex: 'unitName' as keyof Trace, key: 'id' },
  { title: 'Status', dataIndex: 'status' as keyof Trace, key: 'id' },
  { title: 'Duration', dataIndex: 'duration' as keyof Trace, key: 'id' },
  { title: 'Time', dataIndex: 'start' as keyof Trace, key: 'id' },
]

const Traces = styled(Table)`
  tr:last-child {
    td {
      border: none;
    }
  }
`

const ErrorContainer = () => {
  const { id } = useParams()
  const history = useHistory()

  const [graphSince] = useState(
    DateTime.utc().minus({ hours: 23 }).startOf('hour').toMillis().toString(),
  )

  const { data, loading } = useQuery<getError>(GetError, {
    variables: {
      id,
      graphSince,
    },
  })

  const { data: tracesData, loading: tracesLoading } = useQuery<getTraces>(GetTraces, {
    variables: {
      unitErrorId: id,
      offset: 0,
    },
  })

  const title = data?.getError ? `${data?.getError?.type}: ${data?.getError?.message}` : ''

  return (
    <PageHeader title={id} breadcrumb={breadcrumb(title)} onBack={() => history.goBack()}>
      <Content>
        {(loading || tracesLoading) && <LoadingPage />}
        {!loading && !tracesLoading && data && (
          <>
            <TopCardsContainer>
              <BasicInfoCard>
                <Typography color="textSecondary" variant="caption">
                  Unit Name
                </Typography>
                <Tooltip title={data.getError?.unitName!} placement="top">
                  <Typography noWrap>{data.getError?.unitName}</Typography>
                </Tooltip>
              </BasicInfoCard>
              <BasicInfoCard>
                <Typography color="textSecondary" variant="caption" noWrap>
                  Last Seen
                </Typography>
                <Tooltip
                  title={DateTime.fromMillis(Number(data.getError?.lastEventDateTime)).toISO()}
                  placement="top"
                >
                  <Typography noWrap>
                    {DateTime.fromMillis(Number(data.getError?.lastEventDateTime)).toISO()}
                  </Typography>
                </Tooltip>
              </BasicInfoCard>
            </TopCardsContainer>
            <TableContainer component={Card}>
              <Traces aria-label="traces table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell key={column.dataIndex}>{column.title}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tracesData?.getTraces?.traces?.map((row) => (
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
                      <TableCell>{row.duration} ms</TableCell>
                      <TableCell>{DateTime.fromMillis(Number(row.start)).toISO()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Traces>
            </TableContainer>
          </>
        )}
      </Content>
    </PageHeader>
  )
}

export default ErrorContainer
