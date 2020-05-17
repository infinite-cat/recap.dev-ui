import React from 'react'
import { Tooltip, Typography } from '@material-ui/core'
import { useParams, useHistory } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { DateTime } from 'luxon'
import { capitalize, toLower } from 'lodash-es'

import { GetTrace } from '../../graphql/queries'
import { getTrace } from '../../graphql/queries/types/getTrace'
import { LoadingPage, PageHeader, DataCard, CardHeader } from '../../components'
import { JsonCard } from '../../components/json/json-card.component'
import { Timeline } from '../../components/timeline/timeline.component'
import { Content, TopCardsContainer, BasicInfoCard } from './trace.styles'

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
  const { id } = useParams()
  const history = useHistory()
  const { data, loading } = useQuery<getTrace>(GetTrace, {
    variables: {
      id,
    },
  })

  const trace = data?.getTrace

  return (
    <PageHeader title={id} breadcrumb={breadcrumb(id!)} onBack={() => history.goBack()}>
      <Content>
        {loading && <LoadingPage />}
        {!loading && data && (
          <>
            <TopCardsContainer>
              <DataCard>
                <CardHeader>Unit Name</CardHeader>
                <Tooltip title={data.getTrace?.unitName!} placement="top">
                  <Typography noWrap>{data.getTrace?.unitName}</Typography>
                </Tooltip>
              </DataCard>
              <DataCard type={toLower(data.getTrace?.status)}>
                <CardHeader>Status</CardHeader>
                <div>{capitalize(data.getTrace?.status)}</div>
              </DataCard>
              <DataCard>
                <CardHeader>When</CardHeader>
                <Tooltip
                  title={DateTime.fromMillis(Number(data.getTrace?.start)).toISO()}
                  placement="top"
                >
                  <Typography noWrap>
                    {DateTime.fromMillis(Number(data.getTrace?.start)).toISO()}
                  </Typography>
                </Tooltip>
              </DataCard>
            </TopCardsContainer>
            <TopCardsContainer>
              <JsonCard title="Request" src={trace?.request} />
              {trace?.error && <JsonCard title="Error" src={trace?.error} />}
              {trace?.response && <JsonCard title="Response" src={trace?.response} />}
            </TopCardsContainer>
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
