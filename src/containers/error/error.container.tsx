import React, { useState } from 'react'
import { Tooltip, Typography } from '@material-ui/core'
import { useParams, useHistory } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { DateTime } from 'luxon'

import { GetError, GetTraces } from '../../graphql/queries'
import { LoadingPage, PageHeader } from '../../components'
import { Content, TopCardsContainer, BasicInfoCard } from '../common.styles'
import { getError } from '../../graphql/queries/types/getError'
import { getTraces } from '../../graphql/queries/types/getTraces'
import { TracesCard } from '../../components/traces-card.component'

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
                <Tooltip
                  title={DateTime.fromMillis(Number(data.getError?.lastEventDateTime)).toISO()}
                  placement="top"
                >
                  <Typography noWrap>
                    {DateTime.fromMillis(Number(data.getError?.lastEventDateTime)).toISO()}
                  </Typography>
                </Tooltip>
              </BasicInfoCard>
            </TopCardsContainer>
            <TracesCard traces={tracesData?.getTraces?.traces} />
          </>
        )}
      </Content>
    </PageHeader>
  )
}

export default ErrorContainer
