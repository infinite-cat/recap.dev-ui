import React from 'react'
import { PageHeader, Col, Spin, Typography, Card } from 'antd'
import { useParams, useHistory, Link } from 'react-router-dom'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import { DateTime } from 'luxon'
import ReactJson from 'react-json-view'

import { GetTrace } from '../graphql/queries'
import { getTrace } from '../graphql/queries/types/getTrace'
import { Timeline } from '../components/timeline/timeline.component'

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

const Content = styled(Col)`

`

const TopCardsContainer = styled.div`
  display: grid;
  column-gap: 20px;
  grid-auto-flow: column;  
  grid-auto-columns: 1fr;
  margin-bottom: 20px;
`
const BasicInfoCard = styled(Card)`
  .ant-card-body {
    padding: 10px;
    word-break: break-word;  
  }
`

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
              <BasicInfoCard>
                <Text type="secondary">
                  Request
                </Text>
                <ReactJson src={JSON.parse(trace?.request || 'null')} />
              </BasicInfoCard>
              {trace?.error && (
                <BasicInfoCard>
                  <Text type="secondary">
                    Error
                  </Text>
                  <ReactJson src={JSON.parse(trace?.error)} />
                </BasicInfoCard>
              )}
              {trace?.response && (
                <BasicInfoCard>
                  <Text type="secondary">
                    Response
                  </Text>
                  <ReactJson src={JSON.parse(trace?.response)} />
                </BasicInfoCard>
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
