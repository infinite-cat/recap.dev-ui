import React, { createRef, PropsWithChildren } from 'react'
import styled from 'styled-components/macro'
import { SnackbarProvider as RawSnackbarProvider } from 'notistack'
import { Button } from '@material-ui/core'

const DismissButton = styled(Button)`
  color: inherit;
`

const SnackbarProvider = ({ children }: PropsWithChildren<{}>) => {
  const stackRef = createRef<any>()

  const onClickDismiss = (key: number | string) => () => {
    stackRef?.current?.closeSnackbar?.(key)
  }

  return (
    <RawSnackbarProvider
      ref={stackRef}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      action={(key) => (
        <DismissButton onClick={onClickDismiss(key)}>
          Dismiss
        </DismissButton>
      )}
    >
      {children}
    </RawSnackbarProvider>
  )
}

export { SnackbarProvider }
