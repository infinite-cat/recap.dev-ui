import React, { useMemo } from 'react'
import styled from 'styled-components/macro'
import { Box, Tooltip, Typography } from '@material-ui/core'
import { useParams, useHistory, Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { capitalize, isEmpty, toLower } from 'lodash-es'
import { Clock, Link as LinkIcon } from 'react-feather'
import { useLocalStorage } from 'react-use'

import { GetTrace } from '../../graphql/queries'
import { getTrace } from '../../graphql/queries/types/getTrace'
import {
  LoadingPage,
  PageHeader,
  DataCard,
  CardHeader,
  Result,
  RefreshButtonGroup,
} from '../../components'
import { JsonCard } from '../../components/json/json-card.component'
import { Timeline } from '../../components/timeline/timeline.component'
import { Content, TopCardsContainer, BasicInfoCard, UnitLink } from '../common.styles'
import { formatDateTime, formatDuration, safeParse } from '../../utils'
import { LogList } from '../../components/logs'

const NoLogsResult = styled(Result)`
  min-height: 120px;
`

const breadcrumb = (id: string) => ({
  routes: [
    {
      path: '/traces',
      breadcrumbName: 'Traces',
    },
    {
      breadcrumbName: id,
    },
  ],
})

const TraceContainer = () => {
  const [pollInterval, setPollInterval] = useLocalStorage<number>('@auto-update-trace-page', 0)

  const { id } = useParams<{ id: string }>()
  const history = useHistory()
  const { data, refetch, networkStatus, loading } = useQuery<getTrace>(GetTrace, {
    notifyOnNetworkStatusChange: true,
    pollInterval,
    variables: {
      id,
    },
  })
  const initialLoading = loading && networkStatus === 1

  const trace = data?.getTrace
  const parsedLogs = useMemo(() => safeParse(data?.getTrace?.logs), [data])
  const parsedExtra = useMemo(() => safeParse(data?.getTrace?.extraData), [data])

  return (
    <PageHeader
      title={trace?.externalId}
      breadcrumb={breadcrumb(trace?.externalId!)}
      onBack={() => history.goBack()}
      actions={
        <RefreshButtonGroup
          pollInterval={pollInterval!}
          setPollInterval={setPollInterval}
          loading={loading}
          refetch={refetch}
        />
      }
    >
      <Content>
        {initialLoading && <LoadingPage />}
        {!initialLoading && data && (
          <>
            <TopCardsContainer>
              <DataCard>
                <CardHeader>Unit Name</CardHeader>
                <Tooltip title={data.getTrace?.unitName!} placement="top">
                  <UnitLink to={`/units/${data.getTrace?.unitName}`} component={Link}>
                    <LinkIcon size={14} />
                    <Box ml={1} />
                    <Typography noWrap>{data.getTrace?.unitName}</Typography>
                  </UnitLink>
                </Tooltip>
              </DataCard>
              <DataCard>
                <CardHeader>
                  <Clock size={15} />
                  <Box ml={1}>When</Box>
                </CardHeader>
                <Typography noWrap>{formatDateTime(data.getTrace?.start)}</Typography>
              </DataCard>
              {parsedExtra?.billedDuration && (
                <DataCard>
                  <CardHeader>Duration and Memory</CardHeader>
                  <Typography>
                    {formatDuration(parsedExtra?.billedDuration)} ({parsedExtra?.maxMemoryUsed} /
                    {parsedExtra?.memorySize} MB)
                  </Typography>
                </DataCard>
              )}
              <DataCard type={toLower(data.getTrace?.status)}>
                <CardHeader>Status</CardHeader>
                <Typography noWrap>{capitalize(data.getTrace?.status)}</Typography>
              </DataCard>
            </TopCardsContainer>
            <TopCardsContainer>
              <JsonCard title="Request" src={trace?.request} />
              {trace?.error && <JsonCard title="Error" src={trace?.error} />}
              {trace?.response && <JsonCard title="Response" src={trace?.response} />}
            </TopCardsContainer>
            <DataCard>
              <CardHeader>Logs</CardHeader>
              {isEmpty(parsedLogs) && <NoLogsResult type="empty" />}
              {!isEmpty(parsedLogs) && <LogList logs={parsedLogs} />}
            </DataCard>
            <Box mb={2.5} />
            <BasicInfoCard>
              <CardHeader>Timeline</CardHeader>
              <Timeline trace={trace!} />
            </BasicInfoCard>
          </>
        )}
      </Content>
    </PageHeader>
  )
}

export default TraceContainer
