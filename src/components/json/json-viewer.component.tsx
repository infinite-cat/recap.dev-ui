import React from 'react'
import ReactJson from 'react-json-view'
import { Code } from '../typography.component'

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
        <Code>{src}</Code>
      </div>
    )
  }

  return (
    <ReactJson src={JSON.parse(src!)} {...rest} />
  )
}
