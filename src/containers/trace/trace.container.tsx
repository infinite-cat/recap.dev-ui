import React from 'react'
import { Tooltip, Typography } from '@material-ui/core'
import { useParams, useHistory } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { DateTime } from 'luxon'

import { GetTrace } from '../../graphql/queries'
import { getTrace } from '../../graphql/queries/types/getTrace'
import { StatusTag, LoadingPage, PageHeader } from '../../components'
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
              <BasicInfoCard>
                <Typography color="textSecondary" variant="caption">
                  Unit Name
                </Typography>
                <Tooltip title={data.getTrace?.unitName!} placement="top">
                  <Typography noWrap>{data.getTrace?.unitName}</Typography>
                </Tooltip>
              </BasicInfoCard>
              <BasicInfoCard>
                <Typography color="textSecondary" variant="caption" noWrap>
                  Status
                </Typography>
                <div>
                  <StatusTag status={data.getTrace?.status} />
                </div>
              </BasicInfoCard>
              <BasicInfoCard>
                <Typography color="textSecondary" variant="caption">
                  When
                </Typography>
                <Tooltip
                  title={DateTime.fromMillis(Number(data.getTrace?.start)).toISO()}
                  placement="top"
                >
                  <Typography noWrap>
                    {DateTime.fromMillis(Number(data.getTrace?.start)).toISO()}
                  </Typography>
                </Tooltip>
              </BasicInfoCard>
            </TopCardsContainer>
            <TopCardsContainer>
              <JsonCard title="Request" src={trace?.request} />
              {trace?.error && <JsonCard title="Error" src={trace?.error} />}
              {trace?.response && <JsonCard title="Response" src={trace?.response} />}
            </TopCardsContainer>
            <BasicInfoCard>
              <Typography color="textSecondary" variant="caption">
                Timeline
              </Typography>
              <Timeline trace={trace!} />
            </BasicInfoCard>
          </>
        )}
      </Content>
    </PageHeader>
  )
}

export default TraceContainer
