import React from 'react'
import ReactDOM from 'react-dom'

import { AppBarProvider, SnackbarProvider, ThemeProvider } from './contexts'
import RootContainer from './containers/root.container'

ReactDOM.render(
  <>
    <ThemeProvider>
      <SnackbarProvider>
        <AppBarProvider>
          <RootContainer />
        </AppBarProvider>
      </SnackbarProvider>
    </ThemeProvider>
  </>,
  document.getElementById('root'),
)
