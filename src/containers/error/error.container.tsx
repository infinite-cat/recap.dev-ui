import React, { useContext, useMemo } from 'react'
import { Box, Tooltip, Typography } from '@material-ui/core'
import { useParams, useHistory, Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import styled from 'styled-components/macro'
import { Clock, Link as LinkIcon } from 'react-feather'
import { isEmpty } from 'lodash-es'
import { useLocalStorage } from 'react-use'

import { GetError } from '../../graphql/queries'
import {
  Card,
  CardHeader,
  DataCard,
  LoadingPage,
  PageHeader,
  Result,
  SimpleAreaGraphComponent,
  DefaultPageActions,
} from '../../components'
import { Content, UnitLink } from '../common.styles'
import { getError } from '../../graphql/queries/types/getError'
import { formatDateTime, safeParse } from '../../utils'
import { JsonCard } from '../../components/json/json-card.component'
import { DateRangeContext, ThemeContext } from '../../contexts'
import { Traces } from '../../components/traces'
import { LogList } from '../../components/logs'

const TopCards = styled.div`
  display: grid;
  column-gap: 20px;
  grid-template-columns: 1fr 50%;
  margin-bottom: 10px;
`
const MidCards = styled.div`
  display: grid;
  column-gap: 20px;
  grid-template-columns: 1fr 50%;
  margin-bottom: 10px;
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
const NoLogsResult = styled(Result)`
  min-height: 120px;
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
  const [pollInterval, setPollInterval] = useLocalStorage<number>('@auto-update-error', 0)
  const { from, to, rangeValue, setRangeValue } = useContext(DateRangeContext)

  const { theme } = useContext(ThemeContext)
  const { id } = useParams<{ id: string }>()
  const history = useHistory()

  const { data, loading, refetch } = useQuery<getError>(GetError, {
    notifyOnNetworkStatusChange: true,
    pollInterval,
    variables: {
      id,
      from,
      to,
    },
  })

  const title = data?.getError ? `${data?.getError?.type}: ${data?.getError?.message}` : ''
  const parsedLogs = useMemo(() => safeParse(data?.getTraces?.traces?.[0]?.logs), [data])

  return (
    <PageHeader
      title={id}
      breadcrumb={breadcrumb(title)}
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
            <TopCards>
              <DataCard>
                <CardHeader>Unit Name</CardHeader>
                <Tooltip title={data.getError?.unitName!} placement="top">
                  <UnitLink to={`/units/${encodeURIComponent(data.getError?.unitName!)}`} component={Link}>
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
                    },
                    {
                      dataKey: 'errors',
                      stroke: theme.palette.error.light,
                    },
                  ]}
                />
              </GraphCard>
            </MidCards>
            <DataCard>
              <CardHeader>Last Invocations Logs</CardHeader>
              {isEmpty(parsedLogs) && <NoLogsResult type="empty" />}
              {!isEmpty(parsedLogs) && <LogList logs={parsedLogs} />}
            </DataCard>
            <Box mb={2.5} />
            <CardHeader>Traces</CardHeader>
            <Traces unitErrorId={id} />
          </>
        )}
      </Content>
    </PageHeader>
  )
}

export default ErrorContainer
