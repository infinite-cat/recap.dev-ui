import React from 'react'
import ReactDOM from 'react-dom'

import { AppBarProvider, SnackbarProvider, ThemeProvider } from './contexts'
import RootContainer from './containers/root.container'

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <SnackbarProvider>
        <AppBarProvider>
          <RootContainer />
        </AppBarProvider>
      </SnackbarProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)
