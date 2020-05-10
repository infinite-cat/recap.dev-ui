import React, { memo } from 'react'
import styled from 'styled-components/macro'
import CircularProgress from '@material-ui/core/CircularProgress'

const SpinnerWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 104px);
  display: flex;
  justify-content: center;
  align-items: center;
`

interface LoadingProps {
  className?: any
}

export const LoadingPage = memo(({ className }: LoadingProps) => (
  <SpinnerWrapper className={className}>
    <CircularProgress />
  </SpinnerWrapper>
))
