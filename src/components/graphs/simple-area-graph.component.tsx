import React, { useContext, useMemo } from 'react'
import styled from 'styled-components/macro'
import { max, orderBy, startCase, toLower, mapValues, last, first, round } from 'lodash-es'
import { transparentize } from 'polished'
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'

import { ThemeContext } from '../../contexts'
import { formatDateTime, formatDateTimeShort } from '../../utils'

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  height: 300px;
  overflow: visible;
  svg {
    .recharts-yAxis {
      transform: translate(1px, 0);
    }
  }
`
const BottomAxis = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 5px;
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

  const maxValue = max(
    data?.map((x) => max(lines.map((line) => Number(x[line.dataKey as string])))),
  )
  return (
    <Wrapper>
      <ResponsiveContainer>
        <AreaChart width={200} height={60} data={graphData} margin={{ top: 10 }}>
          {lines.map((line) => (
            <Area key={line.dataKey as string} type="monotone" {...line} />
          ))}
          <XAxis hide dataKey="x" orientation="bottom" mirror />
          <YAxis
            type="number"
            orientation="right"
            tickFormatter={(x) => String(round(x, 2))}
            mirror
            tick={{ fill: theme.palette.text.primary, fontSize: '0.875rem' }}
            tickLine={{ stroke: theme.palette.text.primary }}
            domain={[
              (dataMin: number) => (maxValue ? dataMin : 0),
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
              `${round(value, 2)} ${toLower(startCase(name))}`,
              '',
            ]}
            labelFormatter={formatDateTime}
          />
        </AreaChart>
      </ResponsiveContainer>
      <BottomAxis>
        <div>{formatDateTimeShort(first(graphData)?.x ?? 0)}</div>
        <div>{formatDateTimeShort(last(graphData)?.x ?? 0)}</div>
      </BottomAxis>
    </Wrapper>
  )
}
