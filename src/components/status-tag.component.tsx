import React, { memo } from 'react'
import styled from 'styled-components/macro'
import { Chip } from '@material-ui/core'

interface ExecutionStatusTagProps {
  status?: 'OK' | 'ERROR' | string
}

const BaseChip = styled(Chip)`
  padding: 0 8px;
  border-radius: 4px;
  font-weight: 500;
  height: 21px;
  color: white;
`
const SuccessChip = styled(BaseChip)`
  background-color: ${(p) => p.theme.palette.success.main};
`
const ErrorChip = styled(BaseChip)`
  background-color: ${(p) => p.theme.palette.error.main};
`

export const StatusTag = memo(({ status }: ExecutionStatusTagProps) => {
  if (status === 'OK') {
    return <SuccessChip label="OK" size="small" />
  }

  if (status === 'ERROR') {
    return <ErrorChip label="Error" size="small" />
  }

  return (
    <BaseChip variant="outlined" size="small">
      Unknown
    </BaseChip>
  )
})
