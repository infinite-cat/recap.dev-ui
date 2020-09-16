/* eslint-disable react/no-array-index-key */
import React from 'react'
import { List } from '@material-ui/core'
import { trim } from 'lodash-es'

import { Log, LogType } from './log.component'

interface LogListProps {
  logs: LogType[]
}

export const LogList = ({ logs }: LogListProps) => (
  <List>
    {logs.map((log, index) => (
      <Log key={index} message={trim(log.message)} timestamp={log.timestamp} />
    ))}
  </List>
)
