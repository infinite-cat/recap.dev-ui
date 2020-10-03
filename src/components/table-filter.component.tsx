import React, { useCallback, useState } from 'react'
import styled from 'styled-components/macro'
import {
  Badge,
  Box,
  Button,
  Checkbox,
  FormControl,
  IconButton,
  Input,
  ListItemText,
  MenuItem,
  Select,
} from '@material-ui/core'

import FilterListIcon from '@material-ui/icons/FilterList'
import { capitalize, isEmpty } from 'lodash-es'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8

const FilterButton = styled(IconButton)`
  padding: 0;
  margin-left: 5px;
  margin-top: -2px;
`
const ButtonWrapper = styled.div`
  display: inline-flex;
`

interface TableFilterProps {
  selectedValue: string | string[]
  values: string[]
  onChange: (newValue: any) => void
}

export const TableFilter = ({ values, selectedValue, onChange }: TableFilterProps) => {
  const [open, setOpen] = useState(false)

  const handleChange = useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      onChange(event.target.value as string)
    },
    [onChange],
  )

  const handleReset = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      e.preventDefault()
      onChange([])
      setOpen(false)
    },
    [onChange],
  )

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
    getContentAnchorEl: null,
  }

  return (
    <FormControl>
      <FilterButton
        onClick={() => setOpen((currentOpen) => !currentOpen)}
        size="small"
        color={isEmpty(selectedValue) ? 'default' : 'primary'}
      >
        <Badge
          badgeContent={selectedValue.length}
          color="primary"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
        >
          <FilterListIcon />
        </Badge>
      </FilterButton>
      <Select
        multiple
        value={selectedValue}
        onChange={handleChange}
        MenuProps={MenuProps}
        onClose={() => setOpen(false)}
        input={<Input style={{ maxWidth: 0, maxHeight: 0, visibility: 'hidden' }} />}
        open={open}
      >
        {values.map((x) => (
          <MenuItem key={x} value={x}>
            <Checkbox checked={selectedValue.includes(x)} color="primary" />
            <ListItemText primary={capitalize(x)} />
          </MenuItem>
        ))}
        <Box component={ButtonWrapper} mt={1} ml={2}>
          <Button onClick={handleReset} color="primary" variant="contained">
            Reset
          </Button>
        </Box>
      </Select>
    </FormControl>
  )
}
