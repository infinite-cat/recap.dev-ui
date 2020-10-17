import React from 'react'
import styled from 'styled-components/macro'

import { RefreshButtonGroup } from './refresh-button-group.component'
import { DateRangePicker, DateRangeValue } from './date-range-picker.component'

const Actions = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`

export interface DefaultPageActionsProps {
  pollInterval?: number
  refetch: () => void
  loading: boolean
  setPollInterval: (newInterval: number) => void
  rangeValue: DateRangeValue
  setRangeValue: (newRangeValue: DateRangeValue) => void
}

export const DefaultPageActions = (props: DefaultPageActionsProps) => {
  const { pollInterval, setPollInterval, loading, refetch, rangeValue, setRangeValue } = props

  return (
    <Actions>
      <RefreshButtonGroup
        pollInterval={pollInterval!}
        setPollInterval={setPollInterval}
        loading={loading}
        refetch={refetch}
      />
      <DateRangePicker value={rangeValue} onValueChange={setRangeValue} />
    </Actions>
  )
}
