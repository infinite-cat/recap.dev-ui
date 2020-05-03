import React, { useState, Fragment } from 'react'
import { Typography } from 'antd'
import styled from 'styled-components'
import { map } from 'lodash'

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
import { JsonCard } from '../json'

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
  grid-auto-columns: 1fr;
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

const parseResourceIdentifier = (resourceIdentifier: string) => {
  const object = JSON.parse(resourceIdentifier)

  return map(Object.keys(object), (key) => ({
    title: camelToTitle(key),
    value: object[key],
  }))
}

export const ResourceAccessRow = ({ minTimestamp, maxTimestamp, totalDuration, event }: ResourceAccessRowProps) => {
  const [opened, setOpened] = useState(false)

  const resourceIdRows = parseResourceIdentifier(event.resourceIdentifier)

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
        <ResourceDetailsContainer colSpan="3">
          <BasicDetails>
            <Text type="secondary">Status</Text>
            <Text strong><ExecutionStatusTag status={event.status} /></Text>
            <Text type="secondary">Service Name</Text>
            <Text strong>{event.serviceName}</Text>
            <Text type="secondary">Operation</Text>
            <Text strong>{request.operation}</Text>
            {map(resourceIdRows, (idRow, index) => (
              <Fragment key={index}>
                <Text type="secondary">{idRow.title}</Text>
                <Text strong>{idRow.value}</Text>
              </Fragment>
            ))}
          </BasicDetails>
          <CardsContainer>
            {event.error && (
              <JsonCard title="Error" src={event.error} />
            )}
            <JsonCard title="Request" src={event.request} />
            {event.response && (
              <JsonCard title="Response" src={event.response} />
            )}
          </CardsContainer>
        </ResourceDetailsContainer>
      </CallsRow>
      )}
    </>
  )
}
