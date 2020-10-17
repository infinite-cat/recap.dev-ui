import React from 'react'
import ReactDOM from 'react-dom'
import { LocalizationProvider } from '@material-ui/pickers'
import LuxonUtils from '@material-ui/pickers/adapter/luxon'

import { AppBarProvider, DateRangeProvider, SnackbarProvider, ThemeProvider } from './contexts'
import RootContainer from './containers/root.container'

ReactDOM.render(
  <>
    <ThemeProvider>
      <LocalizationProvider dateAdapter={LuxonUtils}>
        <SnackbarProvider>
          <AppBarProvider>
            <DateRangeProvider>
              <RootContainer />
            </DateRangeProvider>
          </AppBarProvider>
        </SnackbarProvider>
      </LocalizationProvider>
    </ThemeProvider>
  </>,
  document.getElementById('root'),
)
