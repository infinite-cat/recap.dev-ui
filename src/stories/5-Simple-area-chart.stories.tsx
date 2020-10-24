import React, { useMemo } from 'react'
import styled from 'styled-components/macro'
import ReactApexChart from 'react-apexcharts'
import { Box } from '@material-ui/core'
import { mapValues, orderBy } from 'lodash-es'

import { Card, CardHeader, SimpleAreaGraphComponent } from '../components'

export default {
  title: 'Simple area graph',
}

const GraphCard = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 0 0 0;
  overflow: visible;
  width: 580px;
`

const MOCK_DATA = [
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603393200000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603389600000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603386000000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603382400000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603378800000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603375200000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603371600000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603368000000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603364400000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603360800000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603357200000' },
  { __typename: 'TotalGraphStats', invocations: '7', errors: '2', dateTime: '1603353600000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603350000000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603346400000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603342800000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603339200000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603335600000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603332000000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603328400000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603324800000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603321200000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603317600000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603314000000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603310400000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603306800000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603303200000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603299600000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603296000000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603292400000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603288800000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603285200000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603281600000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603278000000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603274400000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603270800000' },
  { __typename: 'TotalGraphStats', invocations: '7', errors: '2', dateTime: '1603267200000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603263600000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603260000000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603256400000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603252800000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603249200000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603245600000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603242000000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603238400000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603234800000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603231200000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603227600000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603224000000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603220400000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603216800000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603213200000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603209600000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603206000000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603202400000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603198800000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603195200000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603191600000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603188000000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603184400000' },
  { __typename: 'TotalGraphStats', invocations: '7', errors: '2', dateTime: '1603180800000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603177200000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603173600000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603170000000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603166400000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603162800000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603159200000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603155600000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603152000000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603148400000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603144800000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603141200000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603137600000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603134000000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603130400000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603126800000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603123200000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603119600000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603116000000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603112400000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603108800000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603105200000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603101600000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603098000000' },
  { __typename: 'TotalGraphStats', invocations: '7', errors: '2', dateTime: '1603094400000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603090800000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603087200000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603083600000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603080000000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603076400000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603072800000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603069200000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603065600000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603062000000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603058400000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603054800000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603051200000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603047600000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603044000000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603040400000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603036800000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603033200000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603029600000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603026000000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603022400000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603018800000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603015200000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603011600000' },
  { __typename: 'TotalGraphStats', invocations: '7', errors: '2', dateTime: '1603008000000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603004400000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1603000800000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1602997200000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1602993600000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1602990000000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1602986400000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1602982800000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1602979200000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1602975600000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1602972000000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1602968400000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1602964800000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1602961200000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1602957600000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1602954000000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1602950400000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1602946800000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1602943200000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1602939600000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1602936000000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1602932400000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1602928800000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1602925200000' },
  { __typename: 'TotalGraphStats', invocations: '7', errors: '2', dateTime: '1602921600000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1602918000000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1602914400000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1602910800000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1602907200000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1602903600000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1602900000000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1602896400000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1602892800000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1602889200000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1602885600000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1602882000000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1602878400000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1602874800000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1602871200000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1602867600000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1602864000000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1602860400000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1602856800000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1602853200000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1602849600000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1602846000000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1602842400000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1602838800000' },
  { __typename: 'TotalGraphStats', invocations: '7', errors: '2', dateTime: '1602835200000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1602831600000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1602828000000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1602824400000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1602820800000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1602817200000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1602813600000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1602810000000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1602806400000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1602802800000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1602799200000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1602795600000' },
  { __typename: 'TotalGraphStats', invocations: '0', errors: '0', dateTime: '1602792000000' },
] as any[]

export const SimpleAreaGraphStory = () => (
  <GraphCard>
    <Box ml={2} mb={1}>
      <CardHeader>System Status</CardHeader>
    </Box>
    <SimpleAreaGraphComponent
      data={MOCK_DATA}
      lines={[
        { dataKey: 'invocations', stroke: '#42a5f4' },
        { dataKey: 'errors', stroke: '#e88888' },
      ]}
    />
  </GraphCard>
)

export const SimpleApexGraphStory = () => {
  const xAxis = 'dateTime'
  const seriesKeys = ['invocations', 'errors']

  const graphData = useMemo(() => {
    const orderedData = orderBy(MOCK_DATA, xAxis)
    return orderedData.map((stat) => ({
      ...mapValues(stat, Number),
      x: Number(stat[xAxis]),
      type: 'column',
    }))
  }, [xAxis])

  const series = seriesKeys.map((key) => ({
    name: key,
    data: graphData.map((x: any) => Number(x[key])),
  }))

  const options = {
    chart: {
      height: 350,
      type: 'area',
    },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: false,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    colors: ['#42a5f4', '#e88888'],
    xaxis: {
      floating: true,
      type: 'datetime',
      categories: graphData.map((x: any) => Number(x[xAxis])),
    },
    yaxis: {
      opposite: true,
      floating: true,
      axisTicks: {
        offsetX: 20,
        offsetY: -6,
      },
      labels: {
        offsetX: 20,
        offsetY: -6,
      },
      axisBorder: {
        offsetX: 20,
        offsetY: -6,
      },
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm',
      },
    },
    grid: {
      show: false,
      padding: {
        left: 0,
        right: 0,
        bottom: 0,
      },
    },
    legend: {
      offsetY: -50,
      position: 'top',
      horizontalAlign: 'left',
    },
  }

  return (
    <GraphCard>
      <Box ml={2} mb={1}>
        <CardHeader>System Status</CardHeader>
      </Box>
      <ReactApexChart options={options} series={series} type="area" height={300} />
    </GraphCard>
  )
}
