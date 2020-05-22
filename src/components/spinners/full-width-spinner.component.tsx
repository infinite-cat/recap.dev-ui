import React, { memo } from 'react'
import styled from 'styled-components/macro'
import CircularProgress from '@material-ui/core/CircularProgress'

const SpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 10px;
`

interface FullWidthSpinnerProps {
  className?: any
}

export const FullWidthSpinner = memo(({ className }: FullWidthSpinnerProps) => (
  <SpinnerWrapper className={className}>
    <CircularProgress />
  </SpinnerWrapper>
))
