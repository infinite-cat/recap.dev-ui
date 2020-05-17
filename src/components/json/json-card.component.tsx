import React from 'react'
import styled from 'styled-components/macro'
import { IconButton } from '@material-ui/core'
import { useSnackbar } from 'notistack'

import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined'

import CopyToClipboard from 'react-copy-to-clipboard'
import { CardProps } from '@material-ui/core/Card/Card'
import { JsonViewer } from './json-viewer.component'
import { Card } from '../cards'
import { CardHeader } from '../typography.component'

const JSONCard = styled(Card)`
  position: relative;
  margin: 10px 0;
  padding: ${(p) => `${p.theme.spacing(1)}px ${p.theme.spacing(2)}px`};
`
const ScrollContainer = styled.div`
  margin-top: 10px;
  max-height: 400px;
  overflow-y: auto;
`
const Controls = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
`

export type JsonCardProps = CardProps & {
  title: string
  src?: string
}

export const JsonCard = ({ src, title, ...rest }: JsonCardProps) => {
  const { enqueueSnackbar } = useSnackbar()

  return (
    <JSONCard {...rest}>
      <CardHeader>{title}</CardHeader>
      <ScrollContainer>
        <JsonViewer src={src} />
      </ScrollContainer>
      <Controls>
        <CopyToClipboard
          text={src!}
          onCopy={() => enqueueSnackbar('Copied to clipboard', { variant: 'success' })}
        >
          <IconButton>
            <FileCopyOutlinedIcon />
          </IconButton>
        </CopyToClipboard>
      </Controls>
    </JSONCard>
  )
}
