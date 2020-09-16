import React, { createRef, PropsWithChildren } from 'react'
import styled from 'styled-components/macro'
import { SnackbarProvider as RawSnackbarProvider } from 'notistack'
import { IconButton } from '@material-ui/core'
import { Close } from '@material-ui/icons'

const DismissButton = styled(IconButton)`
  color: inherit;
`

export const SnackbarProvider = ({ children }: PropsWithChildren<any>) => {
  const stackRef = createRef<any>()

  const onClickDismiss = (key: number | string) => () => {
    if (stackRef.current) {
      stackRef.current.closeSnackbar(key)
    }
  }

  return (
    <RawSnackbarProvider
      ref={stackRef}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      action={(key) => (
        <DismissButton onClick={onClickDismiss(key)} size="small">
          <Close />
        </DismissButton>
      )}
    >
      {children}
    </RawSnackbarProvider>
  )
}
