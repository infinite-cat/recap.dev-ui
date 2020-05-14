import React from 'react'
import { Typography } from '@material-ui/core'
import { useParams, useHistory } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { DateTime } from 'luxon'

import { GetTrace } from '../../graphql/queries'
import { getTrace } from '../../graphql/queries/types/getTrace'
import { LoadingPage, PageHeader } from '../../components'
import { JsonCard } from '../../components/json/json-card.component'
import { Timeline } from '../../components/timeline/timeline.component'
import { Content, TopCardsContainer, BasicInfoCard } from './trace.styles'

const breadcrumb = (id: string) => ({
  routes: [
    {
      path: '/',
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
                <Typography color="textSecondary">Unit Name</Typography>
                <div>
                  <Typography>{data.getTrace?.unitName}</Typography>
                </div>
              </BasicInfoCard>
              <BasicInfoCard>
                <Typography color="textSecondary">Status</Typography>
                <div>
                  <Typography>{data.getTrace?.status}</Typography>
                </div>
              </BasicInfoCard>
              <BasicInfoCard>
                <Typography color="textSecondary">When</Typography>
                <div>
                  <Typography>
                    {DateTime.fromMillis(Number(data.getTrace?.start)).toISO()}
                  </Typography>
                </div>
              </BasicInfoCard>
            </TopCardsContainer>
            <TopCardsContainer>
              <JsonCard title="Request" src={trace?.request} />
              {trace?.error && <JsonCard title="Error" src={trace?.error} />}
              {trace?.response && <JsonCard title="Response" src={trace?.response} />}
            </TopCardsContainer>
            <BasicInfoCard>
              <Typography color="textSecondary">Timeline</Typography>
              <Timeline trace={trace!} />
            </BasicInfoCard>
          </>
        )}
      </Content>
    </PageHeader>
  )
}

export default TraceContainer
