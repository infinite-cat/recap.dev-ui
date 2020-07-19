import React, { memo, useRef, useState } from 'react'
import styled from 'styled-components/macro'
import { Chip, IconButton, ListItem } from '@material-ui/core'
import { DateTime } from 'luxon'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import TimeIcon from '@material-ui/icons/QueryBuilder'

const LogItem = styled.div`
  display: flex;
  max-width: 100%;
`
const LogText = styled.pre<{ expanded: boolean }>`
  max-width: 100%;
  padding: 5px 10px;
  margin-left: 10px;
  white-space: pre-wrap;
  word-break: break-all;
  overflow-y: hidden;
  height: ${(p) => (p.expanded ? 'auto' : '22px')};
  border-left: 1px solid ${(p) => p.theme.palette.text.secondary};
`
const ExpandButton = styled(({ expanded, ...props }) => <IconButton {...props} />)<{
  expanded: boolean
}>`
  max-width: 48px;
  max-height: 48px;
  margin-left: 10px;
  transform: ${(p) => (p.expanded ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: 0.3s transform;
`
const TimeChip = styled(Chip)`
  padding: 0 8px;
  border-radius: 4px;
  margin: 13px 0 8px;
  font-weight: 500;
  height: 21px;
  color: ${(p) => p.theme.palette.background.default};
  background: ${(p) => p.theme.palette.text.secondary};
  transition: none;
  svg {
    fill: ${(p) => p.theme.palette.background.default};
  }
  &:focus,
  &:hover {
    background: ${(p) => p.theme.palette.text.secondary};
  }
`

export interface LogType {
  timestamp: number
  message: string
}

export const Log = memo(({ message, timestamp }: LogType) => {
  const root = useRef<any>()
  const [expanded, setExpanded] = useState(false)
  const expandComponent = (
    <ExpandButton onClick={() => setExpanded((x) => !x)} expanded={expanded}>
      <ExpandMoreIcon />
    </ExpandButton>
  )

  return (
    <ListItem ref={root} disableGutters>
      <LogItem>
        <TimeChip
          size="small"
          icon={<TimeIcon />}
          deleteIcon={expandComponent}
          onDelete={() => setExpanded((x) => !x)}
          onClick={() => setExpanded((x) => !x)}
          label={DateTime.fromMillis(timestamp ?? 0).toLocaleString(
            DateTime.DATETIME_MED_WITH_SECONDS,
          )}
        />
        <LogText expanded={expanded}>{message}</LogText>
      </LogItem>
    </ListItem>
  )
})
