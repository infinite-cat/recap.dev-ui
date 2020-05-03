import React from 'react'
import ReactJson from 'react-json-view'
import { Typography } from 'antd'

const { Text } = Typography

export interface JsonViewerProps {
  src?: string
}

const isJsonString = (str?: string) => {
  if (typeof str !== 'string') {
    return false
  }

  let json
  try {
    json = JSON.parse(str!)
  } catch (e) {
    // ignore
  }

  return json && (typeof json === 'object')
}

export const JsonViewer = ({ src, ...rest }: JsonViewerProps) => {
  if (!isJsonString(src)) {
    return (
      <div>
        <Text code>{src}</Text>
      </div>
    )
  }

  return (
    <ReactJson src={JSON.parse(src!)} {...rest} />
  )
}
