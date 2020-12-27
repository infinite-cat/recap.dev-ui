import React from 'react'
import { RefreshCcw } from 'react-feather'
import styled, { keyframes } from 'styled-components/macro'
import { Button } from '@material-ui/core'

const spinAnimation = keyframes`
  to {
    transform: rotate(-360deg);
  }
`

const Refresh = styled(({ loading, ...props }) => <Button {...props} />)<{
  selected: boolean
  loading: boolean
}>`
  height: 38px;
  margin-top: -1px;
  &.MuiButtonBase-root {
    background-color: ${(p) => p.theme.palette.primary.light};
    color: ${(p) => p.theme.palette.background.default};
    &:hover,
    &:active,
    &:focus {
      background-color: ${(p) => p.theme.palette.primary.main};
    }
  }
  svg {
    animation: ${spinAnimation} 1.2s linear ${(p) => (p.loading ? 'infinite' : 'none')};
  }
`

interface RefreshButtonProps {
  loading: boolean
  refetch: () => void
}

export const RefreshButton = ({ refetch, loading }: RefreshButtonProps) => (
  <Refresh
    selected
    size="small"
    color="primary"
    onClick={() => refetch()}
    loading={loading}
    value="value"
  >
    <RefreshCcw size={20} />
  </Refresh>
)
