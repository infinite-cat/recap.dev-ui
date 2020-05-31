import React, { useContext, useState } from 'react'
import { Box, Tooltip, Typography } from '@material-ui/core'
import { useParams, useHistory, Link } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import styled from 'styled-components/macro'
import { DateTime } from 'luxon'
import { Clock, Link as LinkIcon } from 'react-feather'
import { transparentize } from 'polished'

import { GetError, GetTraces } from '../../graphql/queries'
import { Card, CardHeader, DataCard, LoadingPage, PageHeader } from '../../components'
import { Content, TableCard, TopCardsContainer, UnitLink } from '../common.styles'
import { getError } from '../../graphql/queries/types/getError'
import { getTraces } from '../../graphql/queries/types/getTraces'
import { TracesCard } from '../../components/traces-card.component'
import { formatDateTime } from '../../utils'
import { JsonCard } from '../../components/json/json-card.component'
import { SimpleAreaGraph } from '../../components/graphs/simple-area-graph'
import { ThemeContext } from '../../contexts'

const MidCards = styled.div`
  display: grid;
  column-gap: 20px;
  grid-auto-flow: column;
  grid-auto-columns: 1fr 1fr;
  margin-bottom: 20px;
`
const GraphCard = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 10px 0;
  padding: 10px 0 0 0;
  overflow: visible;
`

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

const ErrorContainer = () => {
  const { theme } = useContext(ThemeContext)

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
              <DataCard>
                <CardHeader>Unit Name</CardHeader>
                <Tooltip title={data.getError?.unitName!} placement="top">
                  <UnitLink to={`/units/${data.getError?.unitName}`} component={Link}>
                    <LinkIcon size={14} />
                    <Box ml={1} />
                    <Typography noWrap>{data.getError?.unitName}</Typography>
                  </UnitLink>
                </Tooltip>
              </DataCard>
              <DataCard>
                <CardHeader>
                  <Clock size={15} />
                  <Box ml={1}>Last Seen</Box>
                </CardHeader>
                <Typography noWrap>{formatDateTime(data.getError?.lastEventDateTime)}</Typography>
              </DataCard>
            </TopCardsContainer>
            <MidCards>
              <JsonCard title="Response" src={data.getError?.rawError} />
              <GraphCard>
                <Box ml={2}>
                  <CardHeader>Frequency</CardHeader>
                </Box>
                <SimpleAreaGraph
                  data={data.getError?.graphStats}
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
            </MidCards>
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

export default ErrorContainer
