import React, { memo, useState, ReactElement, useContext } from 'react'
import styled from 'styled-components/macro'
import { DateTime } from 'luxon'
import { useQuery } from '@apollo/react-hooks'
import { isEmpty } from 'lodash-es'
import {
  Box,
  Link as MaterialLink,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import Tooltip from '@material-ui/core/Tooltip'
import { AlertTriangle } from 'react-feather'
import { transparentize } from 'polished'

import { Card, CardHeader, LoadingPage, PageHeader, Result } from '../components'
import { GetDashboardData } from '../graphql/queries/dashboard.query'
import { BasicInfoCard, TableCard } from './common.styles'
import { getDashboardData } from '../graphql/queries/types/getDashboardData'
import { ReactComponent as Success } from '../svg/check-circle.svg'
import { formatDateTime } from '../utils'
import { SimpleAreaGraph } from '../components/graphs/simple-area-graph'
import { ThemeContext } from '../contexts'

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`
const StyledPageHeader = styled(PageHeader)`
  min-height: 100vh;
`
const DashboardCard = styled(BasicInfoCard)`
  width: 100%;
  min-height: 300px;
`
export const CardsContainer = styled.div`
  display: grid;
  column-gap: 20px;
  row-gap: 20px;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  grid-template-rows: repeat(2, 1fr);
  margin-top: 20px;
  @media (max-width: 960px) {
    grid-template-rows: repeat(4, 1fr);
  }
`
const Insights = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  flex: 1;
`
const Insight = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
`
const NewErrors = styled(Table)`
  table-layout: fixed;
  padding: 0;
  margin-top: 10px;
  max-width: 100%;
`
const SystemHealthDataGrid = styled.div`
  display: grid;
  column-gap: 20px;
  grid-template-columns: min-content min-content;
  margin: 0 16px;
`
const SystemHealthItem = styled(Typography)`
  word-break: keep-all;
  white-space: nowrap;
`
const GraphCard = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 0 0 0;
  overflow: visible;
`
const TableCardHeader = styled(CardHeader)`
  margin: 0 16px;
`
const ErrorInsightIcon = styled(AlertTriangle)`
  color: ${(p) => p.theme.palette.error.main};
  min-width: 24px;
  margin-right: 5px;
`

const insightIcons: { [key: string]: ReactElement } = {
  ERROR: <ErrorInsightIcon />,
}

const DashboardContainer = memo(() => {
  const { theme } = useContext(ThemeContext)

  const [since] = useState(
    DateTime.utc().minus({ hours: 23, days: 6 }).startOf('hour').toMillis().toString(),
  )

  const { data, loading } = useQuery<getDashboardData>(GetDashboardData, {
    variables: {
      since,
    },
  })

  return (
    <StyledPageHeader title="Dashboard" subTitle="Status of your system">
      <Content>
        {loading && <LoadingPage />}
        {!loading && (
          <CardsContainer>
            <DashboardCard>
              <CardHeader>Insights</CardHeader>
              <Insights>
                {!isEmpty(data?.getInsights) &&
                  data?.getInsights?.map((insight, index) => (
                    <MaterialLink to={insight.detailsLink} component={Link} key={index}>
                      <Insight>
                        {insightIcons[insight.type]}
                        <Typography variant="body2">{insight.message}</Typography>
                      </Insight>
                    </MaterialLink>
                  ))}
                {isEmpty(data?.getInsights) && (
                  <Result text="All good, system is stable." icon={<Success />} />
                )}
              </Insights>
            </DashboardCard>
            <TableCard>
              <Box mt={1}>
                <TableCardHeader>New Errors</TableCardHeader>
              </Box>
              {!isEmpty(data?.getNewErrors) && (
                <NewErrors aria-label="units table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Error</TableCell>
                      <TableCell>Unit Name</TableCell>
                      <TableCell>First seen</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data?.getNewErrors?.map((error) => (
                      <TableRow key={error.id} hover>
                        <TableCell scope="row">
                          <MaterialLink to={`/errors/${error.id}`} component={Link}>
                            <Tooltip title={`${error.type}: ${error.message}`} placement="top">
                              <Typography variant="body2" noWrap>
                                {error.type}: {error.message}
                              </Typography>
                            </Tooltip>
                          </MaterialLink>
                        </TableCell>
                        <TableCell>{error.unitName}</TableCell>
                        <TableCell>{formatDateTime(error.firstEventDateTime)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </NewErrors>
              )}
              {isEmpty(data?.getNewErrors) && (
                <Result text="All good, no new errors" icon={<Success />} />
              )}
            </TableCard>
            <GraphCard>
              <SystemHealthDataGrid>
                <SystemHealthItem variant="h6">System Health</SystemHealthItem>
                <SystemHealthItem variant="h6">
                  {100 - data?.getTotalStats?.errorRate!}%
                </SystemHealthItem>
                <SystemHealthItem variant="h6">Traces</SystemHealthItem>
                <SystemHealthItem variant="h6">{data?.getTotalStats?.invocations}</SystemHealthItem>
                <SystemHealthItem variant="h6">Errors</SystemHealthItem>
                <SystemHealthItem variant="h6">{data?.getTotalStats?.errors}</SystemHealthItem>
              </SystemHealthDataGrid>
              <SimpleAreaGraph
                data={data?.getTotalStats.graphStats}
                lines={[
                  {
                    dataKey: 'invocations',
                    stroke: theme.palette.info.main,
                    fill: transparentize(0.8, theme.palette.info.main),
                  },
                  {
                    dataKey: 'errors',
                    stroke: theme.palette.error.light,
                    fill: transparentize(0.8, theme.palette.error.light),
                  },
                ]}
              />
            </GraphCard>
            <DashboardCard>
              <CardHeader>Top Invoked Units</CardHeader>
            </DashboardCard>
          </CardsContainer>
        )}
      </Content>
    </StyledPageHeader>
  )
})

export default DashboardContainer
