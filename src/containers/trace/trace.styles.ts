import styled from 'styled-components'
import { Card, Col } from 'antd'

export const Content = styled(Col)`

`

export const TopCardsContainer = styled.div`
  display: grid;
  column-gap: 20px;
  grid-auto-flow: column;  
  grid-auto-columns: 1fr;
  margin-bottom: 20px;
`
export const BasicInfoCard = styled(Card)`
  .ant-card-body {
    padding: 10px;
    word-break: break-word;  
  }
`
