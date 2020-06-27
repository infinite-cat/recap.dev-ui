import React from 'react'
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import styled from 'styled-components/macro'
import { transparentize } from 'polished'

export interface DateRangePickerProps {
  range: string
  onRangeChange: (newRange: string) => void
}

const ButtonGroup = styled(ToggleButtonGroup)`
  height: 30px;
  margin: ${(p) => p.theme.spacing(1, 0.5)};
`
const StyledToggleButton = styled(ToggleButton)`
  border: none;
  &.MuiButtonBase-root {
    margin: 0 5px;
    border-radius: ${(p) => p.theme.shape.borderRadius}px;
  }
  &.Mui-selected {
    color: ${(p) => p.theme.palette.background.default};
    background: ${(p) => p.theme.palette.primary.main};
    &:hover {
      background: ${(p) => transparentize(0.2, p.theme.palette.primary.main)};
    }
  }
`

export const DateRangePicker = ({ range = '24 hours', onRangeChange }: DateRangePickerProps) => (
  <ButtonGroup
    size="small"
    value={range}
    exclusive
    onChange={(event, newRange) => newRange && onRangeChange(newRange)}
    aria-label="show date range"
  >
    <StyledToggleButton value="7 days" aria-label="7 days">
      7 days
    </StyledToggleButton>
    <StyledToggleButton value="24 hours" aria-label="24 hours">
      24 hours
    </StyledToggleButton>
  </ButtonGroup>
)
