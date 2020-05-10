import React, { useState, Fragment } from 'react'
import styled from 'styled-components/macro'
import { Typography } from '@material-ui/core'
import { map } from 'lodash-es'

import {
  CallDurationColumn,
  CallDurationContainer,
  CallsColumn,
  CallsRow,
  ResourceAccessDurationGraph,
} from './timeline.styles'
import { getTrace_getTrace_resourceAccessEvents as ResourceAccessEvent } from '../../graphql/queries/types/getTrace'
import { camelToTitle } from '../../utils'
import { ExecutionStatusTag } from '../execution-status.component'
import { JsonCard } from '../json/json-card.component'
import { Code } from '../typography.component'

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
          <Code>{event.serviceName}.{JSON.parse(event.request)?.operation}</Code>
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
              <Typography>Status</Typography>
              <Typography variant="subtitle2">
                <ExecutionStatusTag status={event.status} />
              </Typography>
              <Typography>Service Name</Typography>
              <Typography variant="subtitle2">{event.serviceName}</Typography>
              <Typography>Operation</Typography>
              <Typography variant="subtitle2">{request.operation}</Typography>
              {map(resourceIdRows, (idRow, index) => (
                <Fragment key={index}>
                  <Typography>{idRow.title}</Typography>
                  <Typography variant="subtitle2">{idRow.value}</Typography>
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
