import React, { useContext, useMemo } from 'react'
import styled from 'styled-components/macro'
import { ResponsiveLine } from '@nivo/line'
import { capitalize, orderBy } from 'lodash-es'
import { transparentize } from 'polished'

import { ThemeContext } from '../../contexts'
import { formatDateTime } from '../../utils'
import { getError_getError_graphStats as GraphStats } from '../../graphql/queries/types/getError'

const Wrapper = styled.div`
  width: 100%;
  height: 300px;
  overflow: visible;
`
const Tooltip = styled.div`
  padding: 9px 12px;
  background: ${(p) => transparentize(0.2, p.theme.palette.background.default)};
  box-shadow: ${(p) => p.theme.custom.boxShadow};
`

type ErrorsListGraphProps = {
  data?: GraphStats[]
}

export const ErrorGraph = ({ data }: ErrorsListGraphProps) => {
  const { theme } = useContext(ThemeContext)
  const graphData = useMemo(
    () => {
      const orderedData = orderBy(data, 'dateTime')
      const currentError = orderedData.map((stat) => ({
        x: Number(stat.dateTime),
        y: stat.currentErrors,
      }))
      const errors = orderedData.map((stat) => ({ x: Number(stat.dateTime), y: stat.errors }))
      const invocations = orderedData.map((stat) => ({
        x: Number(stat.dateTime),
        y: stat.invocations,
      }))

      return [
        { data: currentError, color: theme.palette.error.dark, id: 'currentError' },
        { data: errors, color: theme.palette.error.light, id: 'errors' },
        { data: invocations, color: theme.palette.info.light, id: 'invocations' },
      ]
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data],
  )

  // const maxScale = (maxBy(graphData, (point) => point.y)?.y ?? 0) * 1.2 ?? 'auto'

  return (
    <Wrapper>
      <ResponsiveLine
        data={graphData}
        colors={{ datum: 'color' }}
        enablePoints={false}
        enableGridX={false}
        enableGridY={false}
        enableSlices="x"
        areaOpacity={0.15}
        theme={
          {
            crosshair: {
              line: {
                stroke: theme.palette.text.primary,
              },
            },
          } as any
        }
        sliceTooltip={({ slice }) => (
          <Tooltip>
            <div>{formatDateTime(slice.points?.[0]?.data?.x as number)}</div>
            {slice.points.map((point) => (
              <div key={point.id}>
                <div style={{ color: point.serieColor }}>
                  {point.data.yFormatted} {capitalize(String(point.serieId))}
                </div>
              </div>
            ))}
          </Tooltip>
        )}
        animate
        useMesh
        enableArea
      />
    </Wrapper>
  )
}
