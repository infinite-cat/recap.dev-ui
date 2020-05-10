import React from 'react'
import styled from 'styled-components/macro'
import { Chip } from '@material-ui/core'

interface ExecutionStatusTagProps {
  status?: 'OK' | 'ERROR' | string
}

const SuccessChip = styled(Chip)`
  border-color: ${(p) => p.theme.palette.success.main};
  color: ${(p) => p.theme.palette.success.main};
`
const ErrorChip = styled(Chip)`
  border-color: ${(p) => p.theme.palette.error.main};
  color: ${(p) => p.theme.palette.error.main};
`

export const ExecutionStatusTag = ({ status }: ExecutionStatusTagProps) => {
  if (status === 'OK') {
    return <SuccessChip label="OK" variant="outlined" />
  }

  if (status === 'ERROR') {
    return <ErrorChip label="Error" variant="outlined" />
  }

  return <Chip variant="outlined">Unknown</Chip>
}
