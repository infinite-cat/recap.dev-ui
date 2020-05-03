import React from 'react'
import { PageHeader, Spin, Typography } from 'antd'
import { useParams, useHistory, Link } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { DateTime } from 'luxon'

import { GetTrace } from '../../graphql/queries'
import { getTrace } from '../../graphql/queries/types/getTrace'
import { Timeline, JsonCard } from '../../components'
import { Content, TopCardsContainer, BasicInfoCard } from './trace.styles'

const { Text } = Typography

const breadcrumb = (id: string) => (
  {
    routes: [
      {
        path: '/',
        breadcrumbName: 'Traces',
      },
      {
        path: `/traces/${id}`,
        breadcrumbName: id,
      },
    ],
    itemRender: (route: any) => (
      <Link to={route.path}>{route.breadcrumbName}</Link>
    ),
  }
)

export const Trace = () => {
  const { id } = useParams()
  const history = useHistory()
  const { data, loading } = useQuery<getTrace>(GetTrace, {
    variables: {
      id,
    },
  })

  const trace = data?.getTrace

  return (
    <PageHeader
      title={id}
      breadcrumb={breadcrumb(id!)}
      onBack={() => history.goBack()}
    >
      <Content>
        {loading && <Spin />}
        {!loading && data && (
          <>
            <TopCardsContainer>
              <BasicInfoCard>
                <Text type="secondary">
                  Unit Name
                </Text>
                <div>
                  <Text>
                    {data.getTrace?.unitName}
                  </Text>
                </div>
              </BasicInfoCard>
              <BasicInfoCard>
                <Text type="secondary">
                  Status
                </Text>
                <div>
                  <Text>
                    {data.getTrace?.status}
                  </Text>
                </div>
              </BasicInfoCard>
              <BasicInfoCard>
                <Text type="secondary">
                  When
                </Text>
                <div>
                  <Text>
                    {DateTime.fromMillis(Number(data.getTrace?.start)).toISO()}
                  </Text>
                </div>
              </BasicInfoCard>
            </TopCardsContainer>
            <TopCardsContainer>
              <JsonCard title="Request" src={trace?.request} />
              {trace?.error && (
                <JsonCard title="Error" src={trace?.error} />
                )}
              {trace?.response && (
                <JsonCard title="Response" src={trace?.response} />
              )}
            </TopCardsContainer>
            <BasicInfoCard>
              <Text type="secondary">
                Timeline
              </Text>
              <Timeline trace={trace!} />
            </BasicInfoCard>
          </>
        )}
      </Content>
    </PageHeader>
  )
}
