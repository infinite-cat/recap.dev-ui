import React, { memo, useState } from 'react'
import styled from 'styled-components/macro'
import { DateTime } from 'luxon'
import { useQuery } from '@apollo/react-hooks'
import { isEmpty } from 'lodash'

import { Typography } from '@material-ui/core'
import { CardHeader, LoadingPage, PageHeader } from '../components'
import { GetDashboardData } from '../graphql/queries/dashboard.query'
import { BasicInfoCard } from './common.styles'
import { getDashboardData } from '../graphql/queries/types/getDashboardData'

const Content = styled.div`
  flex: 1;
`

const StyledPageHeader = styled(PageHeader)`
  min-height: 100vh;
`

export const CardsContainer = styled.div`
  display: grid;
  column-gap: 20px;
  row-gap: 20px;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  grid-template-rows: repeat(2, 1fr);
  margin-top: 20px;
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
        {!loading && data && (
          <CardsContainer>
            <BasicInfoCard>
              <CardHeader>Insights</CardHeader>
              {data &&
                isEmpty(data.getInsights) &&
                data?.getInsights?.map((insight) => <Typography noWrap>{insight}</Typography>)}
            </BasicInfoCard>
            <BasicInfoCard>
              <CardHeader>New Errors</CardHeader>
            </BasicInfoCard>
            <BasicInfoCard>
              <Typography color="textSecondary" variant="caption" noWrap>
                System Health
              </Typography>
            </BasicInfoCard>
            <BasicInfoCard>
              <CardHeader>Top Invoked Units</CardHeader>
            </BasicInfoCard>
          </CardsContainer>
        )}
      </Content>
    </StyledPageHeader>
  )
})

export default DashboardContainer
