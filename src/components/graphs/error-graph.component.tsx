import React, { useContext, useMemo } from 'react'
import styled from 'styled-components/macro'
import { max, orderBy, startCase, toLower } from 'lodash-es'
import { transparentize } from 'polished'
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'

import { ThemeContext } from '../../contexts'
import { formatDateTime } from '../../utils'
import { getError_getError_graphStats as GraphStats } from '../../graphql/queries/types/getError'

const Wrapper = styled.div`
  width: 100%;
  height: 300px;
  overflow: visible;
`

type ErrorsListGraphProps = {
  data?: GraphStats[]
}

export const ErrorGraph = ({ data }: ErrorsListGraphProps) => {
  const { theme } = useContext(ThemeContext)
  const graphData = useMemo(
    () => {
      const orderedData = orderBy(data, 'dateTime')
      return orderedData.map((stat) => ({
        x: Number(stat.dateTime),
        currentErrors: stat.currentErrors,
        errors: stat.errors,
        invocations: stat.invocations,
      }))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data],
  )

  const maxValue = max(graphData.map((x) => max([x.currentErrors, x.errors, x.invocations])))

  return (
    <Wrapper>
      <ResponsiveContainer>
        <AreaChart width={200} height={60} data={graphData} margin={{ left: -5 }}>
          <Area
            type="monotone"
            dataKey="invocations"
            stroke={theme.palette.info.main}
            fill={transparentize(0.8, theme.palette.info.main)}
          />
          <Area
            type="monotone"
            dataKey="errors"
            stroke={theme.palette.error.light}
            fill={transparentize(0.8, theme.palette.error.light)}
          />
          <Area
            type="monotone"
            dataKey="currentErrors"
            stroke={theme.palette.error.dark}
            fill={transparentize(0.8, theme.palette.error.dark)}
          />
          <XAxis hide dataKey="x" />
          <YAxis
            hide
            type="number"
            domain={[
              (dataMin: number) => (maxValue ? dataMin : -1),
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
            formatter={(value: number, name: string) => [
              `${value} ${toLower(startCase(name))}`,
              '',
            ]}
            labelFormatter={formatDateTime}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Wrapper>
  )
}
