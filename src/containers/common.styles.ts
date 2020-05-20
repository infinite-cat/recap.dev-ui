import styled from 'styled-components/macro'
import { Card } from '../components/cards'

export const Content = styled.div``

export const TopCardsContainer = styled.div`
  display: grid;
  column-gap: 20px;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  margin-bottom: 20px;
`
export const BasicInfoCard = styled(Card)`
  padding: ${(p) => `${p.theme.spacing(1)}px ${p.theme.spacing(2)}px`};
  word-break: break-word;
`
