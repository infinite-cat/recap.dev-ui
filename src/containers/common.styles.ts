import styled from 'styled-components/macro'
import { Link as MaterialLink } from '@material-ui/core'
import { transparentize } from 'polished'

import { Card } from '../components/cards'

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

export const TopCardsContainer = styled.div`
  display: grid;
  column-gap: 20px;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  margin-bottom: 10px;
`
export const BasicInfoCard = styled(Card)`
  padding: ${(p) => `${p.theme.spacing(1)}px ${p.theme.spacing(2)}px`};
  word-break: break-word;
`
export const UnitLink = styled(MaterialLink)`
  display: flex;
  align-items: center;
  color: inherit;
` as typeof MaterialLink
export const TableCard = styled(Card)`
  .MuiCard-root {
    border-radius: 0;
    box-shadow: none;
  }
  .MuiTableHead-root {
    border-top: 1px solid ${(p) => p.theme.custom.borderColor};
  }
  .MuiTableCell-head {
    background: ${(p) => transparentize(0.9, p.theme.palette.info.main)};
  }
`
