import React, { useState } from 'react'

import { DateRangePicker } from '../components/date-range-picker'

export default {
  title: 'Date Picker',
}

export const DatePicker = () => {
  const [range, setRange] = useState('24 hours')

  return (
    <div>
      <DateRangePicker range={range} onRangeChange={(newRange) => setRange(newRange)} />
    </div>
  )
}
