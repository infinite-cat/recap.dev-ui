import styled from 'styled-components'

export const CallsRow = styled.tr`
  height: 40px;
`
export const CallsColumn = styled.td`
  padding: 5px;
  width: 200px;
  word-break: keep-all;
  white-space: nowrap;
`

export const CallDurationColumn = styled.td`
  width: 100%;
  padding: 0 5px;
`
export const CallDurationContainer = styled.div`
  width: 100%;
  height: 20px;
  background: #EEE;
  position: relative;
`

const functionCallColor = 'rgb(49, 130, 189)'

const functionCallColors: { [key: string]: string } = {
  OK: functionCallColor,
  ERROR: '#f5222d;',
}

const resourceAccessColor = '#a0d911'

const resourceAccessColors: { [key: string]: string } = {
  OK: resourceAccessColor,
  ERROR: '#f5222d;',
}

interface DurationGraphProps {
  width: number
  left: number
  status?: string
}

export const DurationGraph = styled.div<DurationGraphProps>`
  position: absolute;
  border-radius: 4px;
  top: 0;
  background: ${({ status }) => functionCallColors[status || 'OK']};
  height: 20px;
  width: ${({ width }) => width * 100}%;
  left: ${({ left }) => left * 100}%
`

export const FunctionCallDurationGraph = styled(DurationGraph)`
`

export const ResourceAccessDurationGraph = styled(DurationGraph)`
  background: ${({ status }) => resourceAccessColors[status || 'OK']};
`
