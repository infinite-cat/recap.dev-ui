import React from 'react'
import { RefreshCcw } from 'react-feather'
import styled, { keyframes } from 'styled-components/macro'
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab'

const spinAnimation = keyframes`
  to {
    transform: rotate(-360deg);
  }
`
const borderAnimation = keyframes`
  to {
    transform: rotate(360deg);
  }
`
const MainButton = styled(({ loading, ...props }) => <ToggleButton {...props} />)<{
  selected: boolean
  loading: boolean
}>`
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
const AutoButton = styled(({ loading, ...props }) => <ToggleButton {...props} />)<{
  selected: boolean
  loading: boolean
}>`
  position: relative;
  overflow: hidden;
  border: none;

  &::before {
    display: ${(p) => (p.selected ? 'block' : 'none')};
    content: '';
    position: absolute;
    z-index: -2;
    left: -50%;
    top: -50%;
    width: 200%;
    height: 200%;
    background-color: #399953;
    background-repeat: no-repeat;
    background-size: 50% 50%, 50% 50%;
    background-position: 0 0, 100% 0, 100% 100%, 0 100%;
    background-image: linear-gradient(
        ${(p) => p.theme.palette.primary.light},
        ${(p) => p.theme.palette.primary.light}
      ),
      linear-gradient(
        ${(p) => p.theme.palette.background.default},
        ${(p) => p.theme.palette.background.default}
      ),
      linear-gradient(
        ${(p) => p.theme.palette.primary.light},
        ${(p) => p.theme.palette.primary.light}
      ),
      linear-gradient(
        ${(p) => p.theme.palette.background.default},
        ${(p) => p.theme.palette.background.default}
      );
    animation: ${borderAnimation} 4s linear infinite;
  }

  &::after {
    content: '';
    display: ${(p) => (p.selected ? 'block' : 'none')};
    position: absolute;
    z-index: -1;
    left: 2px;
    top: 2px;
    width: calc(100% - 4px);
    height: calc(100% - 4px);
    background: ${(p) => p.theme.palette.background.default};
    border-radius: 4px;
  }
`

interface RefreshButtonProps {
  pollInterval: number
  loading: boolean
  refetch: () => void
  setPollInterval: (interval: number) => void
}

export const RefreshButton = ({
  refetch,
  loading,
  pollInterval,
  setPollInterval,
}: RefreshButtonProps) => {
  const toggleFetch = () => {
    setPollInterval(pollInterval ? 0 : 15000)
  }

  return (
    <ToggleButtonGroup>
      <MainButton
        selected
        size="small"
        color="primary"
        onClick={() => refetch()}
        loading={loading}
        value="value"
      >
        <RefreshCcw size={20} />
      </MainButton>
      <AutoButton
        value="center"
        size="small"
        onClick={toggleFetch}
        selected={Boolean(pollInterval)}
      >
        Auto
      </AutoButton>
    </ToggleButtonGroup>
  )
}
