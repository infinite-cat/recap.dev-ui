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

import { GetTraces, GetUnit } from '../../graphql/queries'
import { Card, LoadingPage, PageHeader, StatusTag } from '../../components'
import { Content, TopCardsContainer, BasicInfoCard } from '../common.styles'
import {
  getTraces,
  getTraces_getTraces_traces as Trace,
} from '../../graphql/queries/types/getTraces'
import { getUnit } from '../../graphql/queries/types/getUnit'

const breadcrumb = (unitName: string = '') => ({
  routes: [
    {
      path: '/units',
      breadcrumbName: 'Units',
    },
    {
      breadcrumbName: unitName,
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

const UnitContainer = () => {
  const { unitName } = useParams()
  const history = useHistory()

  const [graphSince] = useState(
    DateTime.utc().minus({ hours: 23, days: 6 }).startOf('hour').toMillis().toString(),
  )

  const { data, loading } = useQuery<getUnit>(GetUnit, {
    variables: {
      unitName,
      graphSince,
    },
  })

  const { data: tracesData, loading: tracesLoading } = useQuery<getTraces>(GetTraces, {
    variables: {
      unitName,
      offset: 0,
    },
  })

  return (
    <PageHeader title={unitName} breadcrumb={breadcrumb(unitName)} onBack={() => history.goBack()}>
      <Content>
        {(loading || tracesLoading) && <LoadingPage />}
        {!loading && !tracesLoading && data && (
          <>
            <TopCardsContainer>
              <BasicInfoCard>
                <Typography color="textSecondary" variant="caption">
                  Unit Name
                </Typography>
                <Tooltip title={data.getUnit?.unitName!} placement="top">
                  <Typography noWrap>{data.getUnit?.unitName}</Typography>
                </Tooltip>
              </BasicInfoCard>
              <BasicInfoCard>
                <Typography color="textSecondary" variant="caption" noWrap>
                  Error Rate
                </Typography>
                <Tooltip title={`${Number(data.getUnit?.errorRate) / 100}%`} placement="top">
                  <Typography noWrap>{`${Number(data.getUnit?.errorRate) / 100}%`}</Typography>
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

export default UnitContainer
