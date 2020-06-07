import React from 'react'
import styled from 'styled-components/macro'
import { Collapse, IconButton } from '@material-ui/core'
import { transparentize } from 'polished'

export const DetailsRow = styled(Collapse)`
  grid-column: 1 / 4;
`
export const Column = styled.div<{ active?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 35px;
  padding: 5px;
  background: ${(p) => p.active && transparentize(0.9, p.theme.palette.primary.main)};
  word-break: keep-all;
  white-space: nowrap;
`
export const DurationColumn = styled(Column)`
  flex-direction: column;
  justify-content: center;
  padding: 5px 20px;
`
export const ClickableDurationColumn = styled(DurationColumn)`
  cursor: pointer;
`
export const CallDurationContainer = styled.div`
  width: 100%;
  height: 20px;
  position: relative;
`
export const SectionName = styled.div`
  grid-column: 1 / 4;
  padding: 5px;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`
export const ExpandIconContainer = styled(IconButton)`
  margin-right: 5px;
  margin-left: -13px;
  color: ${(p) => p.theme.palette.text.primary};
`
export const CallName = styled.div``

interface DurationGraphProps {
  width: number
  left: number
  status?: string | null
}

export const DurationGraph = styled.div<DurationGraphProps>`
  position: absolute;
  border-radius: 4px;
  top: 0;
  background: ${(p) => p.theme.palette.info.main};
  height: 18px;
  width: ${(p) => p.width * 100}%;
  min-width: 18px;
  left: ${(p) => p.left * 100}%;
`
export const FunctionCallDurationGraph = styled(DurationGraph)``

export const ErrorDurationGraph = styled(DurationGraph)`
  background: ${(p) => p.theme.palette.error.main}
`
export const WarningDurationGraph = styled(DurationGraph)`
  background: ${(p) => p.theme.palette.warning.main}
`
export const SuccessDurationGraph = styled(DurationGraph)`
  background: ${(p) => p.theme.palette.info.main}
`
export const ResourceAccessDurationGraph = ({ status, ...rest }: DurationGraphProps) => {
  if (status === 'OK') {
    return (<SuccessDurationGraph {...rest} />)
  }

  if (status === 'ERROR') {
    return <ErrorDurationGraph {...rest} />
  }

  return <WarningDurationGraph {...rest} />
}
