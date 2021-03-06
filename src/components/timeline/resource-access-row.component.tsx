import React, { useState, Fragment } from 'react'
import styled from 'styled-components/macro'
import { Typography } from '@material-ui/core'
import { map } from 'lodash-es'
import { ChevronUp } from 'react-feather'
import { transparentize } from 'polished'

import {
  CallDurationContainer,
  CallName,
  ClickableDurationColumn,
  Column,
  DetailsRow,
  ExpandIconContainer,
} from './timeline.styles'
import { getTrace_getTrace_resourceAccessEvents as ResourceAccessEvent } from '../../graphql/queries/types/getTrace'
import { camelToTitle, getFastTransition } from '../../utils'
import { JsonCard } from '../json/json-card.component'
import { StatusTag } from '../status-tag.component'
import { CallDurationGraph } from '../graphs'

export interface ResourceAccessRowProps {
  minTimestamp: number
  maxTimestamp: number
  totalDuration: number
  event: ResourceAccessEvent
}

const CardsContainer = styled.div`
  display: grid;
  column-gap: 20px;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
`
const ResourceDetailsContainer = styled.div`
  padding: 10px 10px 10px 18px;
  margin: 14px;
  width: 100%;
  box-sizing: border-box;
  border-left: 2px solid ${(p) => transparentize(0.7, p.theme.palette.primary.main)};
`
const BasicDetails = styled.div`
  display: grid;
  grid-template-columns: min-content min-content;
  grid-gap: 10px;
  margin-bottom: 10px;
`
const BasicDetailsItem = styled(Typography)`
  word-break: keep-all;
  white-space: nowrap;
`
const ClickableColumn = styled(Column)`
  cursor: pointer;
`
const ExpandIcon = styled(({ isOpen, ...props }) => <ChevronUp {...props} />)<{ isOpen: boolean }>`
  transform: ${(p) => (p.isOpen ? 'rotate(0)' : 'rotate(180deg)')};
  transition: ${(p) => getFastTransition(p.theme, ['transform'])};
`

const parseResourceIdentifier = (resourceIdentifier: string | null) => {
  if (!resourceIdentifier) {
    return []
  }

  const object = JSON.parse(resourceIdentifier)

  return map(Object.keys(object), (key) => ({
    title: camelToTitle(key),
    value: object[key],
  }))
}

export const ResourceAccessRow = (props: ResourceAccessRowProps) => {
  const { minTimestamp, maxTimestamp, totalDuration, event } = props
  const [opened, setOpened] = useState(false)

  const resourceIdRows = parseResourceIdentifier(event.resourceIdentifier)

  const request = JSON.parse(event.request)

  return (
    <>
      <ClickableColumn onClick={() => setOpened(!opened)}>
        <ExpandIconContainer>
          <ExpandIcon isOpen={opened} />
        </ExpandIconContainer>
        <CallName>
          <Typography variant="caption">
            {event.serviceName}.{JSON.parse(event.request)?.operation}
          </Typography>
        </CallName>
      </ClickableColumn>
      <ClickableDurationColumn onClick={() => setOpened(!opened)}>
        <Typography variant="caption">
          {(Number(event.end) || maxTimestamp) - Number(event.start)} ms
        </Typography>
      </ClickableDurationColumn>
      <ClickableColumn onClick={() => setOpened(!opened)}>
        <CallDurationContainer>
          <CallDurationGraph
            status={event.status}
            left={(Number(event.start) - Number(minTimestamp)) / totalDuration}
            width={((Number(event.end) || maxTimestamp) - Number(event.start)) / totalDuration}
          />
        </CallDurationContainer>
      </ClickableColumn>
      <DetailsRow in={opened} timeout="auto" unmountOnExit style={{ gridColumn: '1 / 4' }}>
        <ResourceDetailsContainer>
          <BasicDetails>
            <BasicDetailsItem variant="caption">Status</BasicDetailsItem>
            <BasicDetailsItem variant="caption">
              <StatusTag status={event.status} />
            </BasicDetailsItem>
            <BasicDetailsItem variant="caption">Service Name</BasicDetailsItem>
            <BasicDetailsItem variant="caption">{event.serviceName}</BasicDetailsItem>
            <BasicDetailsItem variant="caption">Operation</BasicDetailsItem>
            <BasicDetailsItem variant="caption">{request.operation}</BasicDetailsItem>
            {map(resourceIdRows, (idRow, index) => (
              <Fragment key={index}>
                <BasicDetailsItem variant="caption">{idRow.title}</BasicDetailsItem>
                <BasicDetailsItem variant="caption">{idRow.value}</BasicDetailsItem>
              </Fragment>
            ))}
          </BasicDetails>
          <CardsContainer>
            {event.error && (
              <JsonCard elevation={2} title="Error" src={event.error} variant="outlined" />
            )}
            <JsonCard title="Request" src={event.request} variant="outlined" />
            {event.response && (
              <JsonCard elevation={2} title="Response" src={event.response} variant="outlined" />
            )}
          </CardsContainer>
        </ResourceDetailsContainer>
      </DetailsRow>
    </>
  )
}
