import React, { memo, useEffect, useState } from 'react'
import { DateTime } from 'luxon'
import { useLocalStorage } from 'react-use'

interface DateRangeProviderProps {
  children: React.ReactElement | React.ReactElement[]
}

interface DateRangeState {
  since: string
  range: string
  setRange: (newRange: string) => void
}

const DateRangeContext = React.createContext({} as DateRangeState)

const getSince = (range: string) => {
  if (range === '24 hours') {
    return DateTime.utc().minus({ hours: 23 }).startOf('hour').toMillis().toString()
  }

  return DateTime.utc().minus({ hours: 23, days: 6 }).startOf('hour').toMillis().toString()
}

const DateRangeProvider = memo(({ children }: DateRangeProviderProps) => {
  const [range, setRange] = useLocalStorage('@DateRangeContext_range', '24 hours')
  const [since, setSince] = useState(getSince(range!))

  useEffect(() => {
    setSince(getSince(range!))
  }, [range, setSince])

  return (
    <DateRangeContext.Provider value={{ since, range: range!, setRange }}>
      {children}
    </DateRangeContext.Provider>
  )
})

export { DateRangeContext, DateRangeProvider }
