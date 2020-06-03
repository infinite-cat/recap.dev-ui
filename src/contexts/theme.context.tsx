import React, { memo, useCallback, useMemo } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import {
  StylesProvider,
  ThemeOptions,
  ThemeProvider as MuiProvider,
} from '@material-ui/core/styles'
import { ThemeProvider as StyledProvider } from 'styled-components/macro'
import { createMuiTheme } from '@material-ui/core'
import { includes } from 'lodash-es'

import { GlobalStyles } from '../styles'
import { usePersistState } from '../hooks'
import { ThemeType, Theme } from '../models'

type ThemeProviderProps = {
  children: JSX.Element
}

type ThemeState = {
  theme: Theme
  themeType: ThemeType
  toggleTheme: () => void
}

const themeTypes = ['light', 'dark']

const lightOverrides = {
  palette: {
    type: 'light',
    primary: { main: '#0072F9' },
    secondary: { main: '#009688' },
    background: { default: '#F4F6F8' },
  },
  custom: {
    errorGradient: 'linear-gradient(76.47deg, #D32F2F 0.27%, #E57373 100%)',
    successGradient: 'linear-gradient(78.1deg, #4CAF50 1.58%, #81C784 100%);',
    infoGradient: 'linear-gradient(76.54deg, #1976D2 1.58%, #64B5F6 99.72%);',
    boxShadow: '0 0 0 1px rgba(63, 63, 68, 0.05), 0 1px 3px 0 rgba(63, 63, 68, 0.15)',
    borderColor: '#e2e2e2',
  },
} as ThemeOptions

const darkOverrides = {
  palette: {
    type: 'dark',
    primary: { main: '#8aafdb' },
    secondary: { main: '#f48fb1' },
    success: { main: '#81c784' },
    info: { main: '#64b5f6' },
    error: { main: '#ef5350' },
  },
  custom: {
    errorGradient: 'linear-gradient(76.47deg, #ef5350 0.27%, #e76b69 100%)',
    infoGradient: 'linear-gradient(76.54deg, #64b5f6 1.58%, #6fb7ee 99.72%);',
    successGradient: 'linear-gradient(78.1deg, #81c784 1.58%, #94c996 100%);',
    boxShadow: '0 0 0 1px rgba(192, 192, 192, 0.15)',
    borderColor: '#545454',
  },
} as ThemeOptions

const ThemeContext = React.createContext({} as ThemeState)

const ThemeProvider = memo(({ children }: ThemeProviderProps) => {
  const [themeType, setTheme] = usePersistState('theme', 'light')
  const type = includes(themeTypes, themeType) ? themeType : 'light'

  const theme = useMemo(
    () => createMuiTheme(type === 'dark' ? darkOverrides : lightOverrides) as Theme,
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
