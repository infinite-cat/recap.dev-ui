/* eslint-disable no-confusing-arrow */
import styled from 'styled-components/macro'
import { transparentize } from 'polished'

export const DetailsRow = styled.div`
  grid-column: 1 / 4;
`
export const Column = styled.div`
  padding: 5px;
  word-break: keep-all;
  white-space: nowrap;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 35px;
`
export const DurationColumn = styled.div`
  padding: 5px 20px;
  display: flex;
  word-break: keep-all;
  white-space: nowrap;
  align-items: center;
  justify-content: center;
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
  color: ${(p) => p.theme.palette.primary.main};
`
export const ExpandIconContainer = styled.div`
  min-width: 24px;
  height: 24px;
  margin-right: 5px;
`
export const CallName = styled.div``

interface DurationGraphProps {
  width: number
  left: number
  status?: string
}

export const DurationGraph = styled.div<DurationGraphProps>`
  position: absolute;
  border-radius: 10px;
  top: 0;
  box-shadow: 0 4px 4px ${(p) => transparentize(0.75, p.theme.palette.primary.main)};
  background: ${(p) => p.theme.palette.primary.main};
  height: 20px;
  width: ${(p) => p.width * 100}%;
  left: ${(p) => p.left * 100}%;
`
export const FunctionCallDurationGraph = styled(DurationGraph)``
export const ResourceAccessDurationGraph = styled(DurationGraph)`
  background: ${(p) =>
    p.status === 'OK' ? p.theme.palette.primary.main : p.theme.palette.error.main};
`
