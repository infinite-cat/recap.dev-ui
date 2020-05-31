import React from 'react'
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import styled from 'styled-components'

export interface DateRangePickerProps {
  range: string
  onRangeChange: (newRange: string) => void
}

const ButtonGroup = styled(ToggleButtonGroup)`
  height: 40px;
`

export const DateRangePicker = ({ range = '24 hours', onRangeChange }: DateRangePickerProps) => (
  <ButtonGroup
    size="small"
    value={range}
    exclusive
    onChange={(event, newRange) => onRangeChange(newRange)}
    aria-label="show date range"
  >
    <ToggleButton value="7 days" aria-label="7 days">
      7 days
    </ToggleButton>
    <ToggleButton value="24 hours" aria-label="24 hours">
      24 hours
    </ToggleButton>
  </ButtonGroup>
)
