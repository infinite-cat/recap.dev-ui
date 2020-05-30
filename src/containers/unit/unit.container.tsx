import React, { useState } from 'react'
import { Box, Tooltip, Typography } from '@material-ui/core'
import { useParams, useHistory } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { DateTime } from 'luxon'

import { GetTraces, GetUnit } from '../../graphql/queries'
import { CardHeader, DataCard, LoadingPage, PageHeader } from '../../components'
import { Content, TableCard, TopCardsContainer } from '../common.styles'
import { getTraces } from '../../graphql/queries/types/getTraces'
import { getUnit } from '../../graphql/queries/types/getUnit'
import { TracesCard } from '../../components/traces-card.component'

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
              <DataCard>
                <CardHeader>Unit Name</CardHeader>
                <Tooltip title={data.getUnit?.unitName!} placement="top">
                  <Typography noWrap>{data.getUnit?.unitName}</Typography>
                </Tooltip>
              </DataCard>
              <DataCard>
                <CardHeader>Error Rate</CardHeader>
                <Tooltip title={`${Number(data.getUnit?.errorRate) / 100}%`} placement="top">
                  <Typography noWrap>{`${Number(data.getUnit?.errorRate) / 100}%`}</Typography>
                </Tooltip>
              </DataCard>
            </TopCardsContainer>
            <TableCard>
              <Box ml={2} mt={1} mb={1.5}>
                <CardHeader>Traces</CardHeader>
              </Box>
              <TracesCard traces={tracesData?.getTraces?.traces} />
            </TableCard>
          </>
        )}
      </Content>
    </PageHeader>
  )
}

export default UnitContainer
