import React from 'react'
import styled from 'styled-components'
import { addDecorator } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { LocalizationProvider } from '@material-ui/pickers'
import LuxonUtils from '@material-ui/pickers/adapter/luxon'

import { SnackbarProvider, ThemeProvider } from '../src/contexts'
import { ThemeSwitcher } from '../src/components'

const StoriesWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  height: 100%;
  background-color: transparent;
`

const StyledDecorator = (story) => (
  <ThemeProvider>
    <LocalizationProvider dateAdapter={LuxonUtils}>
      <SnackbarProvider>
        <ThemeSwitcher />
        <StoriesWrapper>{story()}</StoriesWrapper>
      </SnackbarProvider>
    </LocalizationProvider>
  </ThemeProvider>
)

addDecorator(StyledDecorator)
addDecorator(withKnobs)
