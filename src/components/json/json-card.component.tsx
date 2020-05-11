import React from 'react'
import styled from 'styled-components/macro'
import { Card, IconButton, Typography } from '@material-ui/core'
import { useSnackbar } from 'notistack'

import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined'

import CopyToClipboard from 'react-copy-to-clipboard'
import { CardProps } from '@material-ui/core/Card/Card'
import { JsonViewer } from './json-viewer.component'

const BasicInfoCard = styled(Card)`
  margin: 10px 0;
  padding: 10px 20px;
  position: relative;
  
  .ant-card-body {
    padding: 10px;
    word-break: break-word;  
  }
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

export interface JsonCardProps extends CardProps {
  title: string
  src?: string
}

export const JsonCard = ({ src, title, ...rest }: JsonCardProps) => {
  const { enqueueSnackbar } = useSnackbar()

  return (
    <BasicInfoCard {...rest}>
      <Typography color="textSecondary">
        {title}
      </Typography>
      <ScrollContainer>
        <JsonViewer src={src} />
      </ScrollContainer>
      <Controls>
        <CopyToClipboard text={src!} onCopy={() => enqueueSnackbar('Copied to clipboard', { variant: 'success' })}>
          <IconButton>
            <FileCopyOutlinedIcon />
          </IconButton>
        </CopyToClipboard>
      </Controls>
    </BasicInfoCard>
  )
}
