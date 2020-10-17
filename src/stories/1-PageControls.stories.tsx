import React, { useState } from 'react'
import { noop } from 'lodash-es'

import {
  DateRangePicker,
  DateRangeValue,
  DefaultPageActions as DefaultPageActionsComponent,
  RefreshButtonGroup,
} from '../components'
import { getDateFrom } from '../utils'

export default {
  title: 'Page Controls',
}

export const RefreshButton = () => {
  const [pollInterval, setPollInterval] = useState(0)

  return (
    <RefreshButtonGroup
      pollInterval={pollInterval}
      setPollInterval={setPollInterval}
      loading={false}
      refetch={() => {}}
    />
  )
}

export const DatePicker = () => {
  const [rangeValue, setRangeValue] = useState<DateRangeValue>({
    from: getDateFrom('7 days'),
    pickerValue: '7 days',
  })

  return (
    <DateRangePicker value={rangeValue} onValueChange={(newRange) => setRangeValue(newRange)} />
  )
}

export const DefaultPageActions = () => {
  const [rangeValue, setRangeValue] = useState<DateRangeValue>({
    from: getDateFrom('7 days'),
    pickerValue: '7 days',
  })

  return (
    <DefaultPageActionsComponent
      refetch={noop}
      loading={false}
      setPollInterval={noop}
      rangeValue={rangeValue}
      setRangeValue={setRangeValue}
    />
  )
}
