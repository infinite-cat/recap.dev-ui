import styled from 'styled-components/macro'
import { Card } from '@material-ui/core'

export const Content = styled.div``

export const TopCardsContainer = styled.div`
  display: grid;
  column-gap: 20px;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  margin-bottom: 20px;
`
export const BasicInfoCard = styled(Card)`
  padding: 10px 20px;
  word-break: break-word;
`
