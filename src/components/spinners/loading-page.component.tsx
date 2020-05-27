import React, { memo } from 'react'
import styled from 'styled-components/macro'
import CircularProgress from '@material-ui/core/CircularProgress'

const SpinnerWrapper = styled.div<{ height?: string }>`
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

interface LoadingProps {
  className?: any
  height?: string
}

export const LoadingPage = memo(({ className, height }: LoadingProps) => (
  <SpinnerWrapper className={className} height={height}>
    <CircularProgress />
  </SpinnerWrapper>
))
