import React from 'react'
import styled from 'styled-components'
import { Button, Card, message, Typography } from 'antd'
import { CopyOutlined } from '@ant-design/icons'
import CopyToClipboard from 'react-copy-to-clipboard'
import { JsonViewer } from './json-viewer.component'

const { Text } = Typography

const BasicInfoCard = styled(Card)`
  margin: 10px 0;
  position: relative;
  
  .ant-card-body {
    padding: 10px;
    word-break: break-word;  
  }
`
const ScrollContainer = styled.div`
  max-height: 400px;
  overflow-y: auto;
`
const Controls = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
`

export interface JsonCardProps {
  title: string
  src?: string
}

export const JsonCard = ({ src, title }: JsonCardProps) => (
  <BasicInfoCard>
    <Text type="secondary">
      {title}
    </Text>
    <ScrollContainer>
      <JsonViewer src={src} />
    </ScrollContainer>
    <Controls>
      <CopyToClipboard text={src!} onCopy={() => message.success('Copied to clipboard')}>
        <Button shape="circle" icon={<CopyOutlined />} />
      </CopyToClipboard>
    </Controls>
  </BasicInfoCard>
)
