import React from 'react'
import { RefreshCcw } from 'react-feather'
import styled, { keyframes } from 'styled-components/macro'
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab'
import { fade } from '@material-ui/core'

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
const ButtonGroup = styled(ToggleButtonGroup)`
  height: 35px;
  margin: ${(p) => p.theme.spacing(1, 0.5)};
  overflow: hidden;
`
const MainButton = styled(({ loading, ...props }) => <ToggleButton {...props} />)<{
  selected: boolean
  loading: boolean
}>`
  &.MuiButtonBase-root {
    background-color: ${(p) => p.theme.palette.primary.light};
    color: ${(p) => p.theme.palette.background.default};
    &:hover,
    &:active {
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

  &.MuiToggleButton-root.Mui-selected {
    background-color: ${(p) => fade(p.theme.palette.primary.light, 0.05)};
  }

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
    left: 1px;
    top: 1px;
    width: calc(100% - 2px);
    height: calc(100% - 2px);
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

export const RefreshButtonGroup = ({
  refetch,
  loading,
  pollInterval,
  setPollInterval,
}: RefreshButtonProps) => {
  const toggleFetch = () => {
    setPollInterval(pollInterval ? 0 : 15000)
  }

  return (
    <ButtonGroup size="small">
      <MainButton
        selected
        color="primary"
        onClick={() => refetch()}
        loading={loading}
        value="required"
      >
        <RefreshCcw size={20} />
      </MainButton>
      <AutoButton value="required" onClick={toggleFetch} selected={Boolean(pollInterval)}>
        Auto
      </AutoButton>
    </ButtonGroup>
  )
}
