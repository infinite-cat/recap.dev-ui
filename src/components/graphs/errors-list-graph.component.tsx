import React, { useContext, useMemo } from 'react'
import styled from 'styled-components/macro'
import { ResponsiveContainer, AreaChart, Area, Tooltip, YAxis, XAxis } from 'recharts'
import { maxBy, orderBy } from 'lodash-es'
import { transparentize } from 'polished'

import { getErrors_getErrors_errors_graphStats as GraphStats } from '../../graphql/queries/types/getErrors'
import { ThemeContext } from '../../contexts'
import { Card } from '../cards'
import { formatDateTime } from '../../utils'

const Wrapper = styled(Card)`
  width: 200px;
  height: 45px;
  overflow: visible;
`

type ErrorsListGraphProps = {
  data?: GraphStats[]
}

export const ErrorsListGraph = ({ data }: ErrorsListGraphProps) => {
  const { theme } = useContext(ThemeContext)
  const graphData = useMemo(
    () => {
      const orderedData = orderBy(data, 'dateTime')
      return orderedData.map((stat) => ({ x: Number(stat.dateTime), y: stat.value }))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data],
  )

  const maxValue = maxBy(graphData, (point) => point.y)?.y ?? 0

  return (
    <Wrapper>
      <ResponsiveContainer>
        <AreaChart width={200} height={60} data={graphData} margin={{ left: -5 }}>
          <Area
            type="monotone"
            dataKey="y"
            stroke={theme.palette.error.main}
            fill={transparentize(0.8, theme.palette.error.main)}
          />
          <XAxis hide dataKey="x" />
          <YAxis
            hide
            type="number"
            domain={[
              (dataMin: number) => (maxValue ? dataMin : 0),
              (dataMax: number) => dataMax * 1.2 + 1,
            ]}
          />
          <Tooltip
            contentStyle={{
              background: transparentize(0.33, theme.palette.background.default),
              border: 'none',
              boxShadow: theme.custom.boxShadow,
            }}
            separator=""
            formatter={(value: number) => [`${value} errors`, '']}
            labelFormatter={formatDateTime}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Wrapper>
  )
}
