import React, { useContext } from 'react'
import { transparentize } from 'polished'

import { ThemeContext } from '../../contexts'
import { getError_getError_graphStats as GraphStats } from '../../graphql/queries/types/getError'
import { SimpleAreaGraph } from './simple-area-graph'

type ErrorsListGraphProps = {
  data?: GraphStats[]
}

export const ErrorGraph = ({ data }: ErrorsListGraphProps) => {
  const { theme } = useContext(ThemeContext)

  return (
    <SimpleAreaGraph
      data={data}
      lines={[{
        dataKey: 'invocations',
        stroke: theme.palette.info.main,
        fill: transparentize(0.8, theme.palette.info.main)
      }, {
        dataKey: 'errors',
        stroke: theme.palette.error.light,
        fill: transparentize(0.8, theme.palette.error.light)
      }, {
        dataKey: 'currentErrors',
        stroke: theme.palette.error.dark,
        fill: transparentize(0.8, theme.palette.error.dark)
      }]}
    />
  )
}
