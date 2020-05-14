import React, { memo, useCallback, useMemo } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { StylesProvider, ThemeProvider as MuiProvider } from '@material-ui/core/styles'
import { ThemeProvider as StyledProvider } from 'styled-components/macro'
import { createMuiTheme, Theme } from '@material-ui/core'
import { includes } from 'lodash-es'

import { GlobalStyles } from '../styles'
import { usePersistState } from '../hooks'
import { ThemeType } from '../models'

type ThemeProviderProps = {
  children: JSX.Element
}

type ThemeState = {
  theme: Theme
  themeType: ThemeType
  toggleTheme: () => void
}

const themeTypes = ['light', 'dark']

const ThemeContext = React.createContext({} as ThemeState)

const ThemeProvider = memo(({ children }: ThemeProviderProps) => {
  const [themeType, setTheme] = usePersistState('theme', 'light')
  const type = includes(themeTypes, themeType) ? themeType : 'light'

  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          type,
          primary: { main: '#0072F9' },
          secondary: { main: '#009688' },
        },
      }),
    [type],
  )

  const toggleTheme = useCallback(() => {
    setTheme((current: ThemeType) => (current === 'dark' ? 'light' : 'dark'))
  }, [setTheme])

  return (
    <ThemeContext.Provider value={{ theme, themeType, toggleTheme }}>
      <MuiProvider theme={theme}>
        <StylesProvider injectFirst>
          <CssBaseline />
          <GlobalStyles />
          <StyledProvider theme={theme}>{children}</StyledProvider>
        </StylesProvider>
      </MuiProvider>
    </ThemeContext.Provider>
  )
})

export { ThemeContext, ThemeProvider }
