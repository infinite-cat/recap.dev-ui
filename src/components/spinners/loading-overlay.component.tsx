import React, { memo } from 'react'
import styled from 'styled-components/macro'
import CircularProgress from '@material-ui/core/CircularProgress'
import { transparentize } from 'polished'

const SpinnerWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: ${(p) => transparentize(0.3, p.theme.palette.background.paper)};
`

interface FullWidthSpinnerProps {
  className?: any
}

export const LoadingOverlay = memo(({ className }: FullWidthSpinnerProps) => (
  <SpinnerWrapper className={className}>
    <CircularProgress />
  </SpinnerWrapper>
))
