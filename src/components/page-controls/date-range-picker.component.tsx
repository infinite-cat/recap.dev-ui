import React, { useEffect } from 'react'
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import styled from 'styled-components/macro'
import DateRangeIcon from '@material-ui/icons/DateRange'
import { DateTime } from 'luxon'
import { Box, Button, Menu, TextField, useMediaQuery } from '@material-ui/core'
import { StaticDateRangePicker, DateRangeDelimiter, DateRange } from '@material-ui/pickers'
import { isNil } from 'lodash-es'

import CloseIcon from '@material-ui/icons/Close'

import { getDateFrom, mobileMediaQuery } from '../../utils'

const ButtonGroup = styled(ToggleButtonGroup)`
  height: 35px;
  margin: ${(p) => p.theme.spacing(1, 0.5)};
`
const StyledToggleButton = styled(ToggleButton)`
  min-width: 80px;
  &.Mui-selected {
    background-color: ${(p) => p.theme.palette.primary.light};
    color: ${(p) => p.theme.palette.background.default};
    &:hover,
    &:active {
      background-color: ${(p) => p.theme.palette.primary.main};
    }
  }
`
const MenuButton = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 20px;
`

const PREDEFINED_VALUES = ['1 hour', '24 hours', '7 days']

export interface DateRangeValue {
  from: number
  to?: number
  pickerValue: string
}

export interface DateRangePickerProps {
  value: DateRangeValue
  onValueChange: (newRange: DateRangeValue) => void
}

export const DateRangePicker = ({ value, onValueChange }: DateRangePickerProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [customValue, setCustomValue] = React.useState<DateRange<DateTime>>([
    DateTime.fromMillis(value.from),
    value.to ? DateTime.fromMillis(value.to) : null,
  ])

  const isCustomSelected = value.pickerValue === 'custom'
  const isMobile = useMediaQuery(`(${mobileMediaQuery})`)

  useEffect(() => {
    if (value.pickerValue !== 'custom') {
      setCustomValue([null, null])
    }
  }, [value.pickerValue])

  const handleCustomOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCustomClose = () => {
    setAnchorEl(null)
  }

  const handleSetCustom = () => {
    setAnchorEl(null)
    onValueChange({
      from: customValue[0]!.toMillis(),
      to: customValue[1]!.toMillis(),
      pickerValue: 'custom',
    })
  }

  return (
    <ButtonGroup
      size="small"
      value={value.pickerValue}
      exclusive
      onChange={(event, newPickerValue) => {
        if (PREDEFINED_VALUES.includes(newPickerValue)) {
          onValueChange({
            from: getDateFrom(newPickerValue),
            pickerValue: newPickerValue,
          })
        }
      }}
      aria-label="show date range"
    >
      {!isCustomSelected &&
        PREDEFINED_VALUES.map((definedValue) => (
          <StyledToggleButton key={definedValue} value={definedValue} aria-label={definedValue}>
            {definedValue}
          </StyledToggleButton>
        ))}
      {isCustomSelected && (
        <StyledToggleButton
          value="custom-clear"
          onClick={() => {
            onValueChange({
              from: getDateFrom('24 hours'),
              pickerValue: '24 hours',
            })
          }}
        >
          <CloseIcon />
        </StyledToggleButton>
      )}
      <StyledToggleButton
        value="custom"
        aria-label="custom"
        onClick={handleCustomOpen}
        selected={isCustomSelected}
      >
        <Box mr={0.5}>
          {isCustomSelected
            ? `${DateTime.fromMillis(value.from).toISODate()} / ${DateTime.fromMillis(
                value!.to as number,
              ).toISODate()}`
            : 'Custom'}
        </Box>
        <DateRangeIcon fontSize="small" />
      </StyledToggleButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCustomClose}>
        <StaticDateRangePicker
          disableFuture
          displayStaticWrapperAs={isMobile ? 'mobile' : 'desktop'}
          value={customValue}
          onChange={(newValue) => setCustomValue(newValue)}
          renderInput={(startProps, endProps) => (
            <>
              <TextField {...startProps} />
              <DateRangeDelimiter> to </DateRangeDelimiter>
              <TextField {...endProps} />
            </>
          )}
        />
        <MenuButton>
          <Button variant="outlined" onClick={handleCustomClose}>
            Cancel
          </Button>
          <Box ml={2} />
          <Button
            color="primary"
            onClick={handleSetCustom}
            disabled={customValue?.some(isNil)}
            variant="outlined"
          >
            Set
          </Button>
        </MenuButton>
      </Menu>
    </ButtonGroup>
  )
}
