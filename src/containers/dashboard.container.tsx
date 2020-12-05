/* eslint-disable react/no-array-index-key */
import React, { memo, ReactElement, useContext } from 'react'
import styled from 'styled-components/macro'
import { useQuery } from '@apollo/client'
import { isEmpty, round } from 'lodash-es'
import { mix } from 'polished'
import {
  Box,
  Link as MaterialLink,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import Tooltip from '@material-ui/core/Tooltip'
import { AlertTriangle } from 'react-feather'
import { useLocalStorage } from 'react-use'

import {
  Card,
  CardHeader,
  LoadingPage,
  PageHeader,
  Result,
  SimpleAreaGraphComponent,
  DefaultPageActions,
} from '../components'
import { GetDashboardData } from '../graphql/queries/dashboard.query'
import { BasicInfoCard, TableCard } from './common.styles'
import { getDashboardData } from '../graphql/queries/types/getDashboardData'
import { formatDateTime } from '../utils'
import { DateRangeContext, ThemeContext } from '../contexts'

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
  max-height: 550px;
  overflow: auto;
`
export const CardsContainer = styled.div`
  display: grid;
  column-gap: 20px;
  row-gap: 20px;
  grid-template-columns: 1fr 50%;
  margin-top: 20px;
  @media (max-width: 960px) {
    grid-template-columns: 1fr;
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
const StyledTable = styled(Table)`
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
const FirstSeenTableCell = styled(TableCell)`
  width: 180px;
`
const UnitStatsTableCell = styled(TableCell)`
  width: 140px;
`

const insightIcons: { [key: string]: ReactElement } = {
  ERROR: <ErrorInsightIcon />,
}

const DashboardContainer = memo(() => {
  const { theme } = useContext(ThemeContext)
  const [pollInterval, setPollInterval] = useLocalStorage<number>('@auto-update-dashboard', 0)

  const { from, to, rangeValue, setRangeValue } = useContext(DateRangeContext)

  const { data, loading, refetch, networkStatus } = useQuery<getDashboardData>(GetDashboardData, {
    notifyOnNetworkStatusChange: true,
    pollInterval,
    variables: {
      from,
      to,
    },
  })
  const initialLoading = loading && networkStatus === 1

  return (
    <StyledPageHeader
      title="Dashboard"
      subTitle="Status of your system"
      actions={
        <DefaultPageActions
          pollInterval={pollInterval}
          setPollInterval={setPollInterval}
          rangeValue={rangeValue}
          setRangeValue={setRangeValue}
          loading={loading}
          refetch={refetch}
        />
      }
    >
      <Content>
        {initialLoading && <LoadingPage />}
        {!initialLoading && (
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
                  <Result type="success" text="All good, system is stable" />
                )}
              </Insights>
            </DashboardCard>
            <GraphCard>
              <div>
                <Box ml={2} mb={1}>
                  <CardHeader>System Status</CardHeader>
                </Box>
                <SystemHealthDataGrid>
                  <SystemHealthItem variant="subtitle2">System Health</SystemHealthItem>
                  <SystemHealthItem variant="subtitle2">
                    {round(100 - (data?.getTotalStats?.errorRate || 0) * 100, 2)}%
                  </SystemHealthItem>
                  <SystemHealthItem variant="subtitle2">Traces</SystemHealthItem>
                  <SystemHealthItem variant="subtitle2">
                    {data?.getTotalStats?.invocations}
                  </SystemHealthItem>
                  <SystemHealthItem variant="subtitle2">Errors</SystemHealthItem>
                  <SystemHealthItem variant="subtitle2">
                    {data?.getTotalStats?.errors}
                  </SystemHealthItem>
                </SystemHealthDataGrid>
              </div>
              <SimpleAreaGraphComponent
                data={data?.getTotalStats.graphStats}
                lines={[
                  {
                    dataKey: 'invocations',
                    stroke: mix(0.15, theme.palette.background.paper, theme.palette.info.main),
                  },
                  {
                    dataKey: 'errors',
                    stroke: mix(0.15, theme.palette.background.paper, theme.palette.error.light),
                  },
                ]}
              />
            </GraphCard>
            <TableCard>
              <Box mt={1}>
                <TableCardHeader>New Errors</TableCardHeader>
              </Box>
              {!isEmpty(data?.getNewErrors) && (
                <StyledTable aria-label="units table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Error</TableCell>
                      <TableCell>Unit Name</TableCell>
                      <FirstSeenTableCell>First seen</FirstSeenTableCell>
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
                        <FirstSeenTableCell>
                          {formatDateTime(error.firstEventDateTime)}
                        </FirstSeenTableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </StyledTable>
              )}
              {isEmpty(data?.getNewErrors) && (
                <Result type="success" text="All good, no new errors" />
              )}
            </TableCard>
            <TableCard>
              <Box mt={1}>
                <TableCardHeader>Top Invoked Units</TableCardHeader>
              </Box>
              {!isEmpty(data?.getTopInvokedUnits) && (
                <StyledTable aria-label="units table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Unit Name</TableCell>
                      <UnitStatsTableCell>Invocations</UnitStatsTableCell>
                      <UnitStatsTableCell>Errors</UnitStatsTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data?.getTopInvokedUnits?.map((unit) => (
                      <TableRow key={unit.unitName} hover>
                        <TableCell scope="row">
                          <MaterialLink to={`/units/${unit.unitName}`} component={Link}>
                            <Tooltip title={`${unit.unitName}`} placement="top">
                              <Typography variant="body2" noWrap>
                                {unit.unitName}
                              </Typography>
                            </Tooltip>
                          </MaterialLink>
                        </TableCell>
                        <UnitStatsTableCell>{unit.invocations}</UnitStatsTableCell>
                        <UnitStatsTableCell>{unit.errors}</UnitStatsTableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </StyledTable>
              )}
              {isEmpty(data?.getTopInvokedUnits) && <Result type="empty" text="No Data" />}
            </TableCard>
          </CardsContainer>
        )}
      </Content>
    </StyledPageHeader>
  )
})

export default DashboardContainer
