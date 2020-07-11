import React, { useContext } from 'react'
import { Box, Tooltip, Typography } from '@material-ui/core'
import { useParams, useHistory, Link } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import styled from 'styled-components/macro'
import { Clock, Link as LinkIcon } from 'react-feather'
import { mix } from 'polished'

import { GetError } from '../../graphql/queries'
import {
  Card,
  CardHeader,
  DataCard,
  LoadingPage,
  PageHeader,
  SimpleAreaGraphComponent,
} from '../../components'
import { Content, UnitLink } from '../common.styles'
import { getError } from '../../graphql/queries/types/getError'
import { formatDateTime } from '../../utils'
import { JsonCard } from '../../components/json/json-card.component'
import { DateRangeContext, ThemeContext } from '../../contexts'
import { DateRangePicker } from '../../components/date-range-picker'
import { Traces } from '../../components/traces/traces.component'

const TopCards = styled.div`
  display: grid;
  column-gap: 20px;
  grid-template-columns: 1fr 50%;
  margin-bottom: 20px;
`
const MidCards = styled.div`
  display: grid;
  column-gap: 20px;
  grid-template-columns: 1fr 50%;
  margin-bottom: 20px;
  @media (max-width: 960px) {
    grid-template-columns: 1fr;
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
  const { since, range, setRange } = useContext(DateRangeContext)

  const { id } = useParams<{ id: string }>()
  const history = useHistory()

  const { data, loading } = useQuery<getError>(GetError, {
    variables: {
      id,
      graphSince: since,
    },
  })

  const title = data?.getError ? `${data?.getError?.type}: ${data?.getError?.message}` : ''
  const lastInvocationLogs = data?.getTraces?.traces?.[0]?.logs
  console.log(lastInvocationLogs)

  return (
    <PageHeader
      title={id}
      breadcrumb={breadcrumb(title)}
      onBack={() => history.goBack()}
      actions={<DateRangePicker range={range} onRangeChange={(newRange) => setRange(newRange)} />}
    >
      <Content>
        {loading && <LoadingPage />}
        {!loading && data && (
          <>
            <TopCards>
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
            </TopCards>
            <MidCards>
              <JsonCard title="Error" src={data.getError?.rawError} />
              <GraphCard>
                <Box ml={2}>
                  <CardHeader>Frequency</CardHeader>
                </Box>
                <SimpleAreaGraphComponent
                  data={data?.getErrorStats}
                  lines={[
                    {
                      dataKey: 'invocations',
                      stroke: theme.palette.info.main,
                      fill: mix(0.85, theme.palette.background.default, theme.palette.info.main),
                    },
                    {
                      dataKey: 'errors',
                      stroke: theme.palette.error.light,
                      fill: mix(0.85, theme.palette.background.paper, theme.palette.error.light),
                    },
                  ]}
                />
              </GraphCard>
            </MidCards>
            <Traces unitErrorId={id} />
          </>
        )}
      </Content>
    </PageHeader>
  )
}

export default ErrorContainer
