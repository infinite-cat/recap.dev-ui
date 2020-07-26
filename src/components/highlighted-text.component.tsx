/* eslint-disable react/no-array-index-key */
import React, { memo } from 'react'
import styled from 'styled-components/macro'
import { Box } from '@material-ui/core'
import { mix } from 'polished'

const Text = styled.span<{ active: boolean }>`
  background: ${(p) =>
    p.active && mix(0.6, p.theme.palette.warning.main, p.theme.palette.background.paper)};
`

interface HighlightedTextProps {
  text?: string
  highlight?: string
  className?: string
}

export const HighlightedText = memo(
  ({ text = '', highlight = '', className }: HighlightedTextProps) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'))
    return (
      <Box className={className} mb={2}>
        {parts.map((part, i) => (
          <Text key={i} active={part.toLowerCase() === highlight.toLowerCase()}>
            {part}
          </Text>
        ))}
      </Box>
    )
  },
)
