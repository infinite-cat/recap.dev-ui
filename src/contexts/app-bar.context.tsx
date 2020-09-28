import React, { Dispatch, memo, SetStateAction } from 'react'
import { useLocalStorage } from 'react-use'

interface AppBarProviderProps {
  children: React.ReactElement | React.ReactElement[]
}

interface AppBarState {
  isExpanded: boolean
  setExpanded: Dispatch<SetStateAction<boolean | undefined>>
}

const AppBarContext = React.createContext({ isExpanded: true } as AppBarState)

const AppBarProvider = memo(({ children }: AppBarProviderProps) => {
  const [isExpanded, setExpanded] = useLocalStorage('appBarExpanded', true)

  return (
    <AppBarContext.Provider value={{ isExpanded: isExpanded!, setExpanded }}>
      {children}
    </AppBarContext.Provider>
  )
})

export { AppBarContext, AppBarProvider }
