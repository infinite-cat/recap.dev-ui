import React from 'react'

import { LogList } from '../components/logs'

export default {
  title: 'Logs',
}

const logs = [
  {
    timestamp: 1601885687589,
    message: 'START RequestId: e3cd0a67-07df-497d-9ec6-096cf6164318 Version: $LATEST\n',
  },
  {
    timestamp: 1601885687746,
    message:
      '2020-10-05T08:14:47.745Z\te3cd0a67-07df-497d-9ec6-096cf6164318\tINFO\tfiltered blacklist hostname 52.87.172.33\n',
  },
  {
    timestamp: 1601885687782,
    message:
      '2020-10-05T08:14:47.770Z\te3cd0a67-07df-497d-9ec6-096cf6164318\tINFO\trecap.dev syncing took:  41  ms\n',
  },
  { timestamp: 1601885687784, message: 'END RequestId: e3cd0a67-07df-497d-9ec6-096cf6164318\n' },
  {
    timestamp: 1601885687784,
    message:
      'REPORT RequestId: e3cd0a67-07df-497d-9ec6-096cf6164318\tDuration: 194.78 ms\tBilled Duration: 200 ms\tMemory Size: 512 MB\tMax Memory Used: 149 MB\tInit Duration: 1055.06 ms\t\n',
  },
]

export const SimpleLogs = () => <LogList logs={logs} />
