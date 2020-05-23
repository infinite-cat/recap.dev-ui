import React, { Fragment } from 'react'
import { map, orderBy } from 'lodash-es'
import styled from 'styled-components/macro'
import { Typography } from '@material-ui/core'

import { getTrace_getTrace as Trace } from '../../graphql/queries/types/getTrace'
import {
  CallDurationContainer,
  CallName,
  Column,
  DurationColumn,
  ExpandIconContainer,
  FunctionCallDurationGraph,
  SectionName,
} from './timeline.styles'
import { ResourceAccessRow } from './resource-access-row.component'

export interface TimelineProps {
  trace: Trace
}

const CallsGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: min-content min-content 1fr;
  margin-top: 10px;
`

export const Timeline = ({ trace }: TimelineProps) => {
  const minTimestamp = Number(trace.start)

  const maxTimestamp = Number(trace.end)

  const totalDuration = Number(trace.duration)

  const functionCalls = orderBy(trace.functionCallEvents, 'start', 'asc')
  const resourceAccessEvents = orderBy(trace.resourceAccessEvents, 'start', 'asc')

  return (
    <CallsGrid>
      <Column active>Name</Column>
      <DurationColumn active>Duration</DurationColumn>
      <Column active />
      <SectionName>
        <Typography>Functions</Typography>
      </SectionName>
      {map(functionCalls, (call, i) => (
        <Fragment key={i}>
          <Column>
            <ExpandIconContainer />
            <CallName>
              <Typography variant="caption">{call.functionName}</Typography>
            </CallName>
          </Column>
          <DurationColumn>
            <Typography variant="caption">
              {(Number(call.end) || maxTimestamp) - Number(call.start)} ms
            </Typography>
          </DurationColumn>
          <Column>
            <CallDurationContainer>
              <FunctionCallDurationGraph
                left={(Number(call.start) - Number(minTimestamp)) / totalDuration}
                width={((Number(call.end) || maxTimestamp) - Number(call.start)) / totalDuration}
              />
            </CallDurationContainer>
          </Column>
        </Fragment>
      ))}
      <SectionName>
        <Typography>Resources</Typography>
      </SectionName>
      {map(resourceAccessEvents, (event, i) => (
        <ResourceAccessRow
          key={i}
          event={event}
          maxTimestamp={maxTimestamp}
          minTimestamp={minTimestamp}
          totalDuration={totalDuration}
        />
      ))}
    </CallsGrid>
  )
}
