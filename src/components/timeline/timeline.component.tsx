import React from 'react'
import { map, orderBy } from 'lodash'
import styled from 'styled-components'
import { Typography } from 'antd'
import { getTrace_getTrace as Trace } from '../../graphql/queries/types/getTrace'
import {
  CallDurationColumn,
  CallDurationContainer,
  CallsColumn,
  CallsRow,
  FunctionCallDurationGraph,
} from './timeline.styles'
import { ResourceAccessRow } from './resource-access-row.component'

const { Text } = Typography

export interface TimelineProps {
  trace: Trace
}

const CallsGrid = styled.table`
  width: 100%;
`

export const Timeline = ({ trace }: TimelineProps) => {
  const minTimestamp = Number(trace.start)

  const maxTimestamp = Number(trace.end)

  const totalDuration = Number(trace.duration)

  const functionCalls = orderBy(trace.functionCallEvents, 'start', 'asc')
  const resourceAccessEvents = orderBy(trace.resourceAccessEvents, 'start', 'asc')

  return (
    <CallsGrid>
      <tbody>
        <CallsRow>
          <CallsColumn>
            <Text strong>
              Function Calls
            </Text>
          </CallsColumn>
          <CallsColumn>
            <Text strong>
              Duration
            </Text>
          </CallsColumn>
        </CallsRow>
        {map(functionCalls, (call, i) => (
          <CallsRow key={i}>
            <CallsColumn>
              <Text code>{call.functionName}</Text>
            </CallsColumn>
            <CallsColumn>
              {(Number(call.end) || maxTimestamp) - Number(call.start)} ms
            </CallsColumn>
            <CallDurationColumn>
              <CallDurationContainer>
                <FunctionCallDurationGraph
                  left={(Number(call.start) - Number(minTimestamp)) / totalDuration}
                  width={((Number(call.end) || maxTimestamp) - Number(call.start)) / totalDuration}
                />
              </CallDurationContainer>
            </CallDurationColumn>
          </CallsRow>
        ))}
        <CallsRow>
          <CallsColumn>
            <Text strong>
              Resources
            </Text>
          </CallsColumn>
          <CallsColumn>
            <Text strong>
              Duration
            </Text>
          </CallsColumn>
        </CallsRow>
        {map(resourceAccessEvents, (event, i) => (
          <ResourceAccessRow
            key={i}
            event={event}
            maxTimestamp={maxTimestamp}
            minTimestamp={minTimestamp}
            totalDuration={totalDuration}
          />
        ))}
      </tbody>
    </CallsGrid>
  )
}
