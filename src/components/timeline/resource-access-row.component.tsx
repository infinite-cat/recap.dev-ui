import React, { useState } from 'react'
import { Card, Typography } from 'antd'

import styled from 'styled-components'
import ReactJson from 'react-json-view'
import {
  CallDurationColumn,
  CallDurationContainer,
  CallsColumn,
  CallsRow,
  ResourceAccessDurationGraph,
} from './timeline.styles'
import { getTrace_getTrace_resourceAccessEvents as ResourceAccessEvent } from '../../graphql/queries/types/getTrace'
import { camelToTitle } from '../../utils/string.utils'
import { ExecutionStatusTag } from '../execution-status.component'

const { Text } = Typography

export interface ResourceAccessRowProps {
  minTimestamp: number
  maxTimestamp: number
  totalDuration: number
  event: ResourceAccessEvent
}

const CollapsibleCallsRow = styled(CallsRow)`
  cursor: pointer;
  &:hover {
    background: rgb(49, 130, 189, 0.1);
  }
`

const CardsContainer = styled.div`
  display: grid;
  column-gap: 20px;
  grid-auto-flow: column;
  margin-bottom: 20px;
`


const ResourceDetailsContainer = styled((props) => <td {...props} />)`
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
`

const BasicDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
`
const BasicInfoCard = styled(Card)`
  margin: 10px 0;
  
  .ant-card-body {
    padding: 10px;
    word-break: break-word;  
  }
`

const parseResourceIdentifier = (resourceIdentifier: string) => {
  const object = JSON.parse(resourceIdentifier)
  const key = Object.keys(object)[0]
  const resourceIdentifierType = camelToTitle(key)
  const id = object[key]
  return { resourceIdentifierType, resourceIdentifier: id }
}

export const ResourceAccessRow = ({ minTimestamp, maxTimestamp, totalDuration, event }: ResourceAccessRowProps) => {
  const [opened, setOpened] = useState(false)

  const { resourceIdentifierType, resourceIdentifier } = parseResourceIdentifier(event.resourceIdentifier)

  const request = JSON.parse(event.request)

  return (
    <>
      <CollapsibleCallsRow onClick={() => setOpened(!opened)}>
        <CallsColumn>
          <Text code>{event.serviceName}.{JSON.parse(event.request)?.operation}</Text>
        </CallsColumn>
        <CallsColumn>
          {(Number(event.end) || maxTimestamp) - Number(event.start)} ms
        </CallsColumn>
        <CallDurationColumn>
          <CallDurationContainer>
            <ResourceAccessDurationGraph
              status={event.status}
              left={(Number(event.start) - Number(minTimestamp)) / totalDuration}
              width={((Number(event.end) || maxTimestamp) - Number(event.start)) / totalDuration}
            />
          </CallDurationContainer>
        </CallDurationColumn>
      </CollapsibleCallsRow>
      {opened
      && (
      <CallsRow>
        <ResourceDetailsContainer colspan="3">
          <BasicDetails>
            <Text type="secondary">Status</Text>
            <Text strong><ExecutionStatusTag status={event.status} /></Text>
            <Text type="secondary">Service Name</Text>
            <Text strong>{event.serviceName}</Text>
            <Text type="secondary">Operation</Text>
            <Text strong>{request.operation}</Text>
            <Text type="secondary">{resourceIdentifierType}</Text>
            <Text strong>{resourceIdentifier}</Text>
          </BasicDetails>
          <CardsContainer>
            {event.error && (
            <BasicInfoCard>
              <Text type="secondary">
                Error
              </Text>
              <ReactJson src={JSON.parse(event.error)} />
            </BasicInfoCard>
            )}
            <BasicInfoCard>
              <Text type="secondary">
                Request
              </Text>
              <ReactJson src={request} />
            </BasicInfoCard>
            {event.response && (
            <BasicInfoCard>
              <Text type="secondary">
                Response
              </Text>
              <ReactJson src={JSON.parse(event.response)} />
            </BasicInfoCard>
            )}
          </CardsContainer>
        </ResourceDetailsContainer>
      </CallsRow>
      )}
    </>
  )
}
