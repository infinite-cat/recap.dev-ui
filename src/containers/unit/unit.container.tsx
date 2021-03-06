import React, { useContext, useMemo, useState } from 'react'
import { Box, Tooltip, Typography } from '@material-ui/core'
import styled from 'styled-components/macro'
import { useLocalStorage } from 'react-use'
import { useParams, useHistory } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { DateTime } from 'luxon'
import { round } from 'lodash-es'

import { GetUnit } from '../../graphql/queries'
import {
  Card,
  CardHeader,
  DataCard,
  DefaultPageActions,
  LoadingPage,
  PageHeader,
  SimpleAreaGraphComponent,
} from '../../components'
import { Content, TopCardsContainer } from '../common.styles'
import { getUnit } from '../../graphql/queries/types/getUnit'
import { getStatusByErrorRate } from '../../utils'
import { DateRangeContext, ThemeContext } from '../../contexts'
import { Traces } from '../../components/traces'

const MidCards = styled.div`
  display: grid;
  max-width: 100%;
  column-gap: 20px;
  grid-template-columns: calc(50% - 10px) calc(50% - 10px);
  margin-bottom: 20px;
  @media (max-width: 960px) {
    grid-template-columns: 100%;
  }
`
const GraphCard = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 10px 0;
  padding: 10px 0 0 0;
  overflow: visible;
`

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

const UnitContainer = () => {
  const [pollInterval, setPollInterval] = useLocalStorage<number>('@auto-update-unit', 0)
  const { from, to, rangeValue, setRangeValue } = useContext(DateRangeContext)

  const { unitName: encodedUnitName } = useParams<{ unitName: string }>()
  const unitName = decodeURIComponent(encodedUnitName)
  const history = useHistory()
  const { theme } = useContext(ThemeContext)

  const [graphSince] = useState(
    DateTime.utc().minus({ hours: 23, days: 6 }).startOf('hour').toMillis().toString(),
  )

  const { data, loading, refetch } = useQuery<getUnit>(GetUnit, {
    notifyOnNetworkStatusChange: true,
    pollInterval,
    variables: {
      unitName,
      graphSince,
      from,
      to,
    },
  })

  const errorRate = useMemo(() => round(Number(data?.getUnit?.errorRate) * 100, 2), [data])

  return (
    <PageHeader
      title={unitName}
      breadcrumb={breadcrumb(unitName)}
      onBack={() => history.goBack()}
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
        {loading && <LoadingPage />}
        {!loading && data && (
          <>
            <TopCardsContainer>
              <DataCard>
                <CardHeader>Unit Name</CardHeader>
                <Tooltip title={data.getUnit?.unitName!} placement="top">
                  <Typography noWrap>{data.getUnit?.unitName}</Typography>
                </Tooltip>
              </DataCard>
              <DataCard type={getStatusByErrorRate(errorRate)}>
                <CardHeader>Error Rate</CardHeader>
                <Tooltip title={`${errorRate}%`} placement="top">
                  <Typography noWrap>{`${errorRate}%`}</Typography>
                </Tooltip>
              </DataCard>
            </TopCardsContainer>
            <MidCards>
              <GraphCard>
                <Box ml={2}>
                  <CardHeader>Invocations</CardHeader>
                </Box>
                <SimpleAreaGraphComponent
                  data={data?.getUnit?.graphStats}
                  lines={[
                    {
                      dataKey: 'invocations',
                      stroke: theme.palette.info.main,
                    },
                    {
                      dataKey: 'errors',
                      stroke: theme.palette.error.light,
                    },
                  ]}
                />
              </GraphCard>
              <GraphCard>
                <Box ml={2}>
                  <CardHeader>Duration</CardHeader>
                </Box>
                <SimpleAreaGraphComponent
                  data={data?.getUnit?.graphStats}
                  lines={[
                    {
                      dataKey: 'averageDuration',
                      stroke: theme.palette.success.main,
                    },
                  ]}
                />
              </GraphCard>
            </MidCards>
            <CardHeader>Traces</CardHeader>
            <Traces unitName={unitName} />
          </>
        )}
      </Content>
    </PageHeader>
  )
}

export default UnitContainer
