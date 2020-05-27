import React, { useState } from 'react'
import { Box, Tooltip, Typography } from '@material-ui/core'
import { useParams, useHistory } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { transparentize } from 'polished'
import styled from 'styled-components/macro'
import { DateTime } from 'luxon'

import { GetError, GetTraces } from '../../graphql/queries'
import { Card, CardHeader, ErrorGraph, LoadingPage, PageHeader } from '../../components'
import { Content, TopCardsContainer, BasicInfoCard } from '../common.styles'
import { getError } from '../../graphql/queries/types/getError'
import { getTraces } from '../../graphql/queries/types/getTraces'
import { TracesCard } from '../../components/traces-card.component'
import { formatDateTime } from '../../utils'
import { JsonCard } from '../../components/json/json-card.component'

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
const Traces = styled(Card)`
  .MuiCard-root {
    border-radius: 0;
  }
  .MuiTableCell-head {
    background: ${(p) => transparentize(0.9, p.theme.palette.info.main)};
  }
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
                <Tooltip title={formatDateTime(data.getError?.lastEventDateTime)} placement="top">
                  <Typography noWrap>{formatDateTime(data.getError?.lastEventDateTime)}</Typography>
                </Tooltip>
              </BasicInfoCard>
            </TopCardsContainer>
            <MidCards>
              <JsonCard title="Response" src={data.getError?.rawError} />
              <GraphCard>
                <Box ml={2}>
                  <CardHeader>Frequency</CardHeader>
                </Box>
                <ErrorGraph data={data.getError?.graphStats} />
              </GraphCard>
            </MidCards>
            <Traces>
              <Box ml={2} mt={1} mb={1.5}>
                <CardHeader>Traces</CardHeader>
              </Box>
              <TracesCard traces={tracesData?.getTraces?.traces} />
            </Traces>
          </>
        )}
      </Content>
    </PageHeader>
  )
}

export default ErrorContainer
