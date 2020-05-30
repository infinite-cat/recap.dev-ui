import React from 'react'
import { Box, Tooltip, Typography } from '@material-ui/core'
import { useParams, useHistory, Link } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { capitalize, toLower } from 'lodash-es'
import { Clock, Link as LinkIcon } from 'react-feather'

import { GetTrace } from '../../graphql/queries'
import { getTrace } from '../../graphql/queries/types/getTrace'
import { LoadingPage, PageHeader, DataCard, CardHeader } from '../../components'
import { JsonCard } from '../../components/json/json-card.component'
import { Timeline } from '../../components/timeline/timeline.component'
import { Content, TopCardsContainer, BasicInfoCard, UnitLink } from '../common.styles'
import { formatDateTime } from '../../utils'

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
