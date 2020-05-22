import React, { useContext, useMemo } from 'react'
import styled from 'styled-components/macro'
import { ResponsiveLine } from '@nivo/line'
import { capitalize, maxBy } from 'lodash-es'
import { DateTime } from 'luxon'
import { transparentize } from 'polished'

import { getErrors_getErrors_errors_graphStats as GraphStats } from '../../graphql/queries/types/getErrors'
import { ThemeContext } from '../../contexts'
import { Card } from '../cards'

const Wrapper = styled(Card)`
  width: 200px;
  height: 45px;
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

export const ErrorsListGraph = ({ data }: ErrorsListGraphProps) => {
  const { theme } = useContext(ThemeContext)
  const graphData = useMemo(
    () => data?.map((stat) => ({ x: Number(stat.dateTime), y: stat.value })) ?? [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data],
  )

  const maxScale = (maxBy(graphData, (point) => point.y)?.y ?? 0) * 1.2 ?? 'auto'

  return (
    <Wrapper>
      <ResponsiveLine
        data={[{ data: graphData, color: theme.palette.error.light, id: 'error' }]}
        colors={{ datum: 'color' }}
        yScale={{ type: 'linear', min: 'auto', max: maxScale, stacked: true, reverse: false }}
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
            {slice.points.map((point) => (
              <div key={point.id}>
                <div>
                  {DateTime.fromMillis(Number(point.data.x)).toLocaleString(
                    DateTime.DATETIME_SHORT,
                  )}
                </div>
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
