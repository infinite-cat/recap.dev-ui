import React from 'react'
import { Box } from '@material-ui/core'

import { ErrorsListGraph } from '../components'
import { getErrors_getErrors_errors_graphStats as GraphStats } from '../graphql/queries/types/getErrors'

export default {
  title: 'Errors',
}

const MOCK_DATA = [
  { value: 0, dateTime: '1590094800000', __typename: 'UnitErrorGraphStats' },
  { value: 0, dateTime: '1590091200000', __typename: 'UnitErrorGraphStats' },
  { value: 0, dateTime: '1590087600000', __typename: 'UnitErrorGraphStats' },
  { value: 0, dateTime: '1590084000000', __typename: 'UnitErrorGraphStats' },
  { value: 0, dateTime: '1590080400000', __typename: 'UnitErrorGraphStats' },
  { value: 0, dateTime: '1590076800000', __typename: 'UnitErrorGraphStats' },
  { value: 5, dateTime: '1590073200000', __typename: 'UnitErrorGraphStats' },
  { value: 1, dateTime: '1590069600000', __typename: 'UnitErrorGraphStats' },
  { value: 0, dateTime: '1590066000000', __typename: 'UnitErrorGraphStats' },
  { value: 9, dateTime: '1590062400000', __typename: 'UnitErrorGraphStats' },
  { value: 8, dateTime: '1590058800000', __typename: 'UnitErrorGraphStats' },
  { value: 7, dateTime: '1590055200000', __typename: 'UnitErrorGraphStats' },
  { value: 6, dateTime: '1590051600000', __typename: 'UnitErrorGraphStats' },
  { value: 5, dateTime: '1590048000000', __typename: 'UnitErrorGraphStats' },
  { value: 4, dateTime: '1590044400000', __typename: 'UnitErrorGraphStats' },
  { value: 3, dateTime: '1590040800000', __typename: 'UnitErrorGraphStats' },
  { value: 2, dateTime: '1590037200000', __typename: 'UnitErrorGraphStats' },
  { value: 1, dateTime: '1590033600000', __typename: 'UnitErrorGraphStats' },
  { value: 0, dateTime: '1590030000000', __typename: 'UnitErrorGraphStats' },
  { value: 9, dateTime: '1590026400000', __typename: 'UnitErrorGraphStats' },
  { value: 8, dateTime: '1590022800000', __typename: 'UnitErrorGraphStats' },
  { value: 7, dateTime: '1590019200000', __typename: 'UnitErrorGraphStats' },
  { value: 6, dateTime: '1590015600000', __typename: 'UnitErrorGraphStats' },
  { value: 0, dateTime: '1590012000000', __typename: 'UnitErrorGraphStats' },
] as GraphStats[]

const EMPTY_MOCK = MOCK_DATA.map((x) => ({ ...x, value: 0 }))

export const ListGraphStory = () => (
  <div>
    <ErrorsListGraph data={MOCK_DATA} />
    <Box mt={2} />
    <ErrorsListGraph data={[]} />
    <Box mt={2} />
    <ErrorsListGraph data={EMPTY_MOCK} />
  </div>
)
