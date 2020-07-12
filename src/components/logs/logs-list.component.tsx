/* eslint-disable react/no-array-index-key */
import React from 'react'
import { List } from '@material-ui/core'

import { Log, LogType } from './log.component'

interface LogList {
  logs: LogType[]
}

export const LogList = ({ logs }: LogList) => (
  <List>
    {logs.map((log, index) => (
      <Log key={index} message={log.message} timestamp={log.timestamp} />
    ))}
  </List>
)
