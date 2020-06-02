import React from 'react'
import ReactDOM from 'react-dom'

import { AppBarProvider, DateRangeProvider, SnackbarProvider, ThemeProvider } from './contexts'
import RootContainer from './containers/root.container'

ReactDOM.render(
  <>
    <ThemeProvider>
      <SnackbarProvider>
        <AppBarProvider>
          <DateRangeProvider>
            <RootContainer />
          </DateRangeProvider>
        </AppBarProvider>
      </SnackbarProvider>
    </ThemeProvider>
  </>,
  document.getElementById('root'),
)
