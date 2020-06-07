import styled from 'styled-components/macro'
import React from 'react'

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
export const ErrorDurationGraph = styled(DurationGraph)`
  background: ${(p) => p.theme.palette.error.main};
`
export const WarningDurationGraph = styled(DurationGraph)`
  background: ${(p) => p.theme.palette.warning.main};
`
export const SuccessDurationGraph = styled(DurationGraph)`
  background: ${(p) => p.theme.palette.info.main};
`
export const CallDurationGraph = ({ status, ...rest }: DurationGraphProps) => {
  if (status === 'OK') {
    return <SuccessDurationGraph {...rest} />
  }

  if (status === 'ERROR') {
    return <ErrorDurationGraph {...rest} />
  }

  return <WarningDurationGraph {...rest} />
}
