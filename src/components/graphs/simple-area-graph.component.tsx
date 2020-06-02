import React, { useContext, useMemo } from 'react'
import styled from 'styled-components/macro'
import { max, orderBy, startCase, toLower, mapValues, last, first } from 'lodash-es'
import { transparentize } from 'polished'
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'

import { ThemeContext } from '../../contexts'
import { formatDateTime, formatDateTimeShort } from '../../utils'

const Wrapper = styled.div`
  width: 100%;
  max-width: 100%;
  height: 300px;
  overflow: visible;
  svg {
    .recharts-yAxis {
      transform: translate(-9px, 0);
    }
  }
`

interface AreaProps {
  dataKey: string
  stroke?: string
  fill?: string
}

type AreaGraphGraphProps = {
  data?: any[]
  lines: AreaProps[]
  xAxis?: string
}

export const SimpleAreaGraphComponent = ({
  data,
  lines,
  xAxis = 'dateTime',
}: AreaGraphGraphProps) => {
  const { theme } = useContext(ThemeContext)

  const graphData = useMemo(() => {
    const orderedData = orderBy(data, xAxis)
    return orderedData.map((stat) => ({
      ...mapValues(stat, Number),
      x: Number(stat[xAxis]),
    }))
  }, [data, xAxis])

  const maxValue = max(data?.map((x) => max(lines.map((line) => x[line.dataKey as string]))))

  return (
    <Wrapper>
      <ResponsiveContainer>
        <AreaChart
          width={200}
          height={60}
          data={graphData}
          margin={{ left: -5, right: -10, top: 10 }}
        >
          {lines.map((line) => (
            <Area key={line.dataKey as string} type="monotone" {...line} />
          ))}
          <XAxis
            hide
            dataKey="x"
            orientation="top"
            tickFormatter={formatDateTimeShort}
            padding={{ right: 40, left: 40 }}
            interval={0}
            tick={{ fill: theme.palette.text.secondary }}
            ticks={[first(graphData)?.x ?? 0, last(graphData)?.x ?? 0]}
          />
          <YAxis
            type="number"
            orientation="right"
            mirror
            domain={[
              (dataMin: number) => (maxValue ? dataMin : -1),
              (dataMax: number) => (dataMax ? dataMax * 1.2 : 1),
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
