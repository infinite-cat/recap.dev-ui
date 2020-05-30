import React, { memo, useState } from 'react'
import styled from 'styled-components/macro'
import { DateTime } from 'luxon'
import { useQuery } from '@apollo/react-hooks'
import { isEmpty } from 'lodash-es'
import {
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

import { CardHeader, Empty, LoadingOverlay, LoadingPage, PageHeader, Result } from '../components'
import { GetDashboardData } from '../graphql/queries/dashboard.query'
import { BasicInfoCard } from './common.styles'
import { getDashboardData } from '../graphql/queries/types/getDashboardData'
import { ReactComponent as Success } from '../svg/check-circle.svg'

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
`

const NewestError = styled(Table)`
  table-layout: fixed;
  padding: 0;
  margin-top: 10px;
  max-width: 100%;
`

const TableCard = styled(DashboardCard)`
  padding: 8px 0;
`

const TableCardHeader = styled(CardHeader)`
  margin: 0 16px;
`

const DashboardContainer = memo(() => {
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
                {!isEmpty(data?.getInsights) && (
                  data?.getInsights?.map((insight, index) => (
                    <Insight key={index}>
                      <Typography variant="body2">{insight.message}</Typography>
                    </Insight>
                  )
                ))}
                {isEmpty(data?.getInsights) && (
                  <Result
                    text="All good, system is stable."
                    icon={<Success />}
                  />
                )}
              </Insights>
            </DashboardCard>
            <TableCard>
              <TableCardHeader>New Errors</TableCardHeader>
              <TableContainer style={{ position: 'relative', minHeight: 300 }}>
                {!isEmpty(data?.getNewestErrors) && (
                  <NewestError aria-label="units table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Error</TableCell>
                        <TableCell>Unit Name</TableCell>
                        <TableCell>First seen</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data?.getNewestErrors?.map((error) => (
                        <TableRow key={error.id} hover>
                          <TableCell scope="row">
                            <MaterialLink to={`/errors/${error.id}`} component={Link}>
                              <Tooltip title={`${error.type}: ${error.message}`} placement="top">
                                <Typography variant="body2" noWrap>{error.type}: {error.message}</Typography>
                              </Tooltip>
                            </MaterialLink>
                          </TableCell>
                          <TableCell>{error.unitName}</TableCell>
                          <TableCell>{error.firstEventDateTime}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </NewestError>
                )}
                {isEmpty(data?.getNewestErrors) && !loading && <Empty />}
                {loading && <LoadingOverlay />}
              </TableContainer>
            </TableCard>
            <DashboardCard>
              <CardHeader>System Health</CardHeader>
            </DashboardCard>
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
