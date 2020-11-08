import React, { memo, useEffect } from 'react'
import { useLocalStorage } from 'react-use'
import { DateRangeValue } from '../components'
import { getDateFrom } from '../utils'

interface DateRangeProviderProps {
  children: React.ReactElement | React.ReactElement[]
}

interface DateRangeState {
  to: string | null
  from: string
  rangeValue: DateRangeValue
  setRangeValue: (newRangeValue: DateRangeValue) => void
}

const DateRangeContext = React.createContext({} as DateRangeState)

const DateRangeProvider = memo(({ children }: DateRangeProviderProps) => {
  const [rangeValue, setRangeValue] = useLocalStorage<DateRangeValue>(
    '@DateRangeContext_rangeValue',
    {
      from: getDateFrom('24 hours'),
      pickerValue: '24 hours',
    },
  )

  useEffect(() => {
    if (rangeValue && rangeValue.pickerValue !== 'custom') {
      if (rangeValue.from !== getDateFrom(rangeValue.pickerValue)) {
        setRangeValue({
          from: getDateFrom(rangeValue.pickerValue),
          pickerValue: rangeValue.pickerValue,
        })
      }
    }
  }, [rangeValue, setRangeValue])

  return (
    <DateRangeContext.Provider
      value={{
        rangeValue: rangeValue!,
        setRangeValue,
        to: rangeValue?.to?.toString() ?? null,
        from: rangeValue!.from?.toString(),
      }}
    >
      {children}
    </DateRangeContext.Provider>
  )
})

export { DateRangeContext, DateRangeProvider }
