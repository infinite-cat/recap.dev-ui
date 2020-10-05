import React from 'react'
import { Timeline } from '../components/timeline/timeline.component'
import { getTrace_getTrace as Trace } from '../graphql/queries/types/getTrace'

export default {
  title: 'Timeline',
}

const trace: Trace = {
  __typename: 'Trace',
  id: 927,
  externalId: 'e3cd0a67-07df-497d-9ec6-096cf6164318',
  unitName: 'dev-recap-dev-example-project-mysql-select',
  start: '1601885687591',
  end: '1601885687727',
  duration: 136,
  status: 'OK',
  request: '{}',
  response: '{}',
  error: null,
  logs:
    '[{"timestamp":1601885687589,"message":"START RequestId: e3cd0a67-07df-497d-9ec6-096cf6164318 Version: $LATEST\\n"},{"timestamp":1601885687746,"message":"2020-10-05T08:14:47.745Z\\te3cd0a67-07df-497d-9ec6-096cf6164318\\tINFO\\tfiltered blacklist hostname 52.87.172.33\\n"},{"timestamp":1601885687782,"message":"2020-10-05T08:14:47.770Z\\te3cd0a67-07df-497d-9ec6-096cf6164318\\tINFO\\trecap.dev syncing took:  41  ms\\n"},{"timestamp":1601885687784,"message":"END RequestId: e3cd0a67-07df-497d-9ec6-096cf6164318\\n"},{"timestamp":1601885687784,"message":"REPORT RequestId: e3cd0a67-07df-497d-9ec6-096cf6164318\\tDuration: 194.78 ms\\tBilled Duration: 200 ms\\tMemory Size: 512 MB\\tMax Memory Used: 149 MB\\tInit Duration: 1055.06 ms\\t\\n"}]',
  extraData:
    '{"awsRegion":"us-east-1","memorySize":"512","awsAccountId":"537011205135","initDuration":"1055.06","maxMemoryUsed":"149","billedDuration":"200","awsLogStreamName":"2020/10/05/[$LATEST]254a28dacbe540a989279bada2128978"}',
  functionCallEvents: [
    {
      __typename: 'FunctionCall',
      start: '1601885687591',
      end: '1601885687727',
      functionName: 'dev-recap-dev-example-project-mysql-select',
      fileName: '',
    },
    {
      __typename: 'FunctionCall',
      start: '1601885687591',
      end: '1601885687727',
      functionName: 'handler',
      fileName:
        '/home/runner/work/recap.dev-example-serverless-project/recap.dev-example-serverless-project/src/handler/mysql-select/mysql-select.ts',
    },
    {
      __typename: 'FunctionCall',
      start: '1601885687591',
      end: '1601885687683',
      functionName: 'createMysqlConnection',
      fileName:
        '/home/runner/work/recap.dev-example-serverless-project/recap.dev-example-serverless-project/src/db/mysql/mysql.ts',
    },
  ],
  resourceAccessEvents: [
    {
      __typename: 'ResourceAccessEvent',
      start: '1601885687706',
      end: '1601885687724',
      serviceName: 'rds',
      resourceIdentifier: '{"host":"autotracing-test-db.cesieok9ryt6.us-east-1.rds.amazonaws.com"}',
      request: '{"query":"select 1","operation":"query"}',
      response: '{"rowCount":1}',
      status: 'OK',
      error: null,
    },
  ],
}

export const SimpleTimeline = () => <Timeline trace={trace} />
