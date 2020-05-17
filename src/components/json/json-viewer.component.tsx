import React, { useContext } from 'react'
import ReactJson from 'react-json-view'
import styled from 'styled-components/macro'

import { Code } from '../typography.component'
import { ThemeContext } from '../../contexts'

export interface JsonViewerProps {
  src?: string
}

const Wrapper = styled.div`
  .react-json-view {
    background: transparent !important;
  }
`

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

  return json && typeof json === 'object'
}

export const JsonViewer = ({ src, ...rest }: JsonViewerProps) => {
  const { themeType } = useContext(ThemeContext)
  if (!isJsonString(src)) {
    return (
      <div>
        <Code>{src}</Code>
      </div>
    )
  }

  return (
    <Wrapper>
      <ReactJson
        src={JSON.parse(src!)}
        theme={themeType === 'light' ? 'rjv-default' : ('ashes' as any)}
        {...rest}
      />
    </Wrapper>
  )
}
