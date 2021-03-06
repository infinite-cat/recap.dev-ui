import React, { memo, useCallback, useMemo } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import {
  StylesProvider,
  ThemeOptions,
  ThemeProvider as MuiProvider,
} from '@material-ui/core/styles'
import { ThemeProvider as StyledProvider } from 'styled-components/macro'
import { createMuiTheme, useMediaQuery } from '@material-ui/core'
import { Helmet } from 'react-helmet'
import { includes } from 'lodash-es'
import { useLocalStorage } from 'react-use'

import { GlobalStyles } from '../styles'
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
    primary: { main: '#90CAF9' },
    secondary: { main: '#f48fb1' },
    success: { main: '#81c784' },
    info: { main: '#64b5f6' },
    error: { main: '#ef5350' },
  },
  custom: {
    errorGradient: 'linear-gradient(76.47deg, #ef5350 0.27%, #e76b69 100%)',
    infoGradient: 'linear-gradient(76.54deg, #64b5f6 1.58%, #6fb7ee 99.72%);',
    successGradient: 'linear-gradient(78.1deg, #81c784 1.58%, #94c996 100%);',
    // boxShadow: '0 0 0 1px rgba(192, 192, 192, 0.15)',
    boxShadow: '0 0 0 1px rgba(0,0,0,0.15), 0 1px 3px 1px rgba(0,0,0,0.1)',
    borderColor: '#545454',
  },
} as ThemeOptions

const ThemeContext = React.createContext({} as ThemeState)

const ThemeProvider = memo(({ children }: ThemeProviderProps) => {
  const browserTheme = useMediaQuery('(prefers-color-scheme: dark)') ? 'dark' : 'light'
  const favicon = browserTheme === 'dark' ? 'favicon-dark.png' : 'favicon.png'
  const [themeType, setTheme] = useLocalStorage<ThemeType>('theme', browserTheme)
  const type = includes(themeTypes, themeType) ? themeType : 'light'

  const theme = useMemo(
    () => createMuiTheme(type === 'dark' ? darkOverrides : lightOverrides) as Theme,
    [type],
  )

  const toggleTheme = useCallback(() => {
    setTheme(themeType === 'dark' ? 'light' : 'dark')
  }, [setTheme, themeType])

  return (
    <ThemeContext.Provider value={{ theme, themeType: themeType!, toggleTheme }}>
      <Helmet>
        <link rel="icon" href={`/${favicon}`} />
      </Helmet>
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
